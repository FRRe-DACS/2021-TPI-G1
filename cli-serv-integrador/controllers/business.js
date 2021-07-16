const Business = require('../models/Business');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * @swagger
 * components:
 *  schemas:
 *   Business:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Auto-generated if from mongodb
 *       cuit:
 *         type: string
 *         description: Business CUIT.
 *       businessName:
 *         type: string
 *         description: Name of the business.
 *       report:
 *         type: object
 *         description: Last report filled by this Business.
 */

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: The Business managing API
 */

/**
 * @swagger
 * /api/business/:
 *   get:
 *     summary: Get all business.
 *     tags: [Business]
 *     responses:
 *       200:
 *         description: Returns a list with all business.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   description: List containing all business.
 *                   items:
 *                     $ref: '#components/schemas/Business'
 *       401:
 *         description: Unauthorized user.
 */
exports.getAllBusiness = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

/**
 * @swagger
 * /api/business/{id}:
 *   get:
 *     summary: Get business by ID.
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: business id.
 *     responses:
 *       200:
 *         description: Returns one business by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: List containing all business.
 *                   $ref: '#components/schemas/Business'
 *       401:
 *         description: Unauthorized user.
 */
exports.getBusinessById = asyncHandler(async (req, res, next) => {
	const business = await Business.findById(req.params.id);

	if (!business) {
		return next(new ErrorResponse(`Business not found`, 404));
	}

	res.status(200).json({
		success: true,
		data: business,
	});
});

/**
 * @swagger
 * /api/business/:
 *   post:
 *     summary: Create a new business.
 *     tags: [Business]
 *     parameters:
 *       - in: body
 *         name: Business
 *         description: The business to create.
 *         type: object
 *         properties:
 *           cuit:
 *             type: string
 *             description: Business CUIT
 *             example: 402849029129
 *           businessName:
 *             type: string
 *             description: Date added.
 *             example: EDUCANDO S.A.
 *     responses:
 *       200:
 *         description: Create a new business.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Returns the new business generated.
 *                   $ref: '#components/schemas/Business'
 *       401:
 *         description: Unauthorized user.
 */
exports.createBusiness = asyncHandler(async (req, res, next) => {
	const { _id } = req.user || {};
	if (!_id) {
		return next(new ErrorResponse(`No user in request`, 404));
	}
	const newBusiness = await Business.create({
		...req.body,
		user: _id,
		reports: [],
	});

	// 	todo: checkear si ya existe una empresa ese usuario

	// Add business to user document
	await User.findByIdAndUpdate(_id, {
		business: newBusiness._id,
	});

	res.status(201).json({
		success: true,
		data: newBusiness,
	});
});
