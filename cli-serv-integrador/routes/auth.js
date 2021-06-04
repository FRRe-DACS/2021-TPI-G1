const express = require('express');
const router = express.Router();

const {
	forgotPassword,
	getMe,
	login,
	register,
	resetPassword,
	logout,
} = require('../controllers/auth');

const { protect, authorize } = require('../middlewares/auth');

router.route('/login').post(login);
router.route('/register').post(authorize('admin'), register);
router.route('/forgotpassword').post(forgotPassword);
router.route('/logout').get(logout);
router.route('/me').get(protect, getMe);
router.route('/resetpassword/:resetToken').put(resetPassword);

module.exports = router;
