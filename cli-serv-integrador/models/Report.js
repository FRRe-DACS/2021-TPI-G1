const { model, Schema } = require('mongoose');

const ReportSchema = new Schema({
	business: {
		type: Schema.Types.ObjectId,
		ref: 'Business',
	},
	productsList: {
		type: [
			{
				// type: Schema.Types.ObjectId,
				// ref: 'Product',
			},
		],
	},
	dateAdded: {
		type: Date,
		default: Date.now(),
	},
	dateLimit: {
		type: Number,
		default: 10,
	},
	period: {
		year: {
			type: String,
			trim: true,
		},
		month: {
			type: String,
			trim: true,
		},
	},
});

module.exports = model('Report', ReportSchema);
