const mongoose = require('mongoose');
const MONGO_URI =
	'mongodb+srv://admin:admin@cluster.8hqj2.mongodb.net/ministerio?retryWrites=true&w=majority';

const connectDb = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI || MONGO_URI, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDb;
