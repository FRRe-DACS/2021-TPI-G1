const { model, Schema } = require('mongoose');

const BusinessSchema = new Schema({
	cuit: {
		type: String,
		require: true,
		unique: true,
		trim: true,
	},
	businessName: {
		type: String,
		require: true,
		trim: true,
	},
	reports: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
		default: [],
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports = model('Business', BusinessSchema);
