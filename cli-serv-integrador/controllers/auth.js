const crypto = require('crypto');

const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const Business = require('../models/Business');

/**
 * @swagger
 * components:
 *  schemas:
 *   Users:
 *     type: object
 *     required:
 *      - email
 *      - password
 *     properties:
 *       _id:
 *         type: string
 *         description: Auto-generated if from mongodb
 *       email:
 *         type: string
 *         description: Unique email
 *       password:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The Users managing API
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new User and returns a valid token.
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: User
 *         type: string
 *         properties:
 *           email:
 *             type: string
 *             example: benjamin.kugler1996@gmail.com
 *           password:
 *             type: string
 *             example: 123456
 *           name:
 *             type: string
 *             example: Grupo1
 *     responses:
 *       200:
 *         description: User registered and authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                   description: jwt with user information and will expire
 *       400:
 *         description: Email or Password was not provided.
 *       401:
 *         description: Invalid Email or Password.
 */
exports.register = asyncHandler(async (req, res, next) => {
	const { businessName, email, password, cuit } = req.body;

	const user = await User.create({
		email,
		password,
		role: 'user',
	});

	if (user) {
		const { _id } = user;
		const business = await Business.create({
			cuit,
			businessName,
			user: _id,
		});
		console.log(business);
	}

	sendTokenResponse(user, 200, res);
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate the user and returns a jwt token.
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: User
 *         type: string
 *         properties:
 *           email:
 *             type: string
 *             default: benjamin.kugler1996@gmail.com
 *           password:
 *             type: string
 *             default: 123456
 *     responses:
 *       200:
 *         description: User authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                   description: jwt with user information and will expire
 *       400:
 *         description: Email or Password was not provided.
 *       401:
 *         description: Invalid Email or Password.
 */
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate email and password;
	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	// Check for user. select+password is because in schema, password has selected: false
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	const isMatch = await user.checkPassword(password);
	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	sendTokenResponse(user, 200, res);
});

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout user and clear cookie.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User registered and authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 */
exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		data: {},
	});
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get information about current user.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Information about current user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Auto-generated id from mongodb
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *       401:
 *         description: Authorization error. Invalid token.
 */
exports.getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	console.log(req.user);

	res.status(200).json({
		success: true,
		data: user,
	});
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorResponse('There is no user with that email', 404));
	}

	const resetToken = await user.getResetPasswordToken();
	console.log(resetToken);

	// Reset URL
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/auth/resetpassword/${resetToken}`;

	// Message
	const message = `You are receiving this email because you requested a password reset.
		Pleas follow this link: \n\n${resetUrl}`;

	try {
		await sendEmail({
			subject: 'Password Reset Token',
			text: message,
			to: req.body.email,
		});

		await user.save({ validateBeforeSave: false });

		return res.status(200).json({
			success: true,
			data: 'Email sent',
		});
	} catch (err) {
		console.error(err);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(
			new ErrorResponse('There was a problem while sending the email', 500)
		);
	}
});

/**
 * @description Reset Password
 * @route GET /api/auth/resetpassword/:resetToken
 * @access Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resetToken)
		.digest('hex');

	// Find user by reset token
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// Get token from model, set to cookie and send the response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwt();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res
		.status(statusCode)
		.cookie('token', token, options)
		.json({
			success: true,
			token,
			role: user.role || '',
		});
};
