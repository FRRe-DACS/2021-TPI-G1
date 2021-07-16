const express = require('express');
const router = express.Router();

const {
	createBusiness,
	getAllBusiness,
	getBusinessById,
} = require('../controllers/business');

const Business = require('../models/Business');

const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');

router
	.route('/')
	.get(
		protect,
		authorize('admin', 'secretaria'),
		advancedResults(Business, 'user, reports'),
		getAllBusiness
	)
	.post(protect, authorize('user'), createBusiness);
// router.route('/:id').get(authorize('user', 'secretaria'), getBusinessById);
router.route('/:id').get(getBusinessById);

module.exports = router;
