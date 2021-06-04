const { model, Schema } = require('mongoose');

const ProductSchema = new Schema({
	productName: {
		type: String,
		require: true,
		trim: true,
	},
	eanCode: {
		type: String,
		require: true,
		trim: true,
	},
	price: {
		type: Number,
		require: true,
	},
	unit: {
		type: String,
		require: true,
		trim: true,
	},
	quantityProduced: {
		type: Number,
		require: true,
	},
	quantitySold: {
		type: String,
		require: true,
	},
	report: {
		type: Schema.Types.ObjectId,
		ref: 'Report',
	},
});

module.exports = model('Product', ProductSchema);
