const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const errorHandler = require('./middlewares/error');
const connectDb = require('./config/db');

require('dotenv').config({ path: './config/config.env' });

const app = express();
app.use(express.json());

// Security middleware
app.use(cors());

// Connect to mongo
connectDb();

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/business', require('./routes/business'));

// Error handler
app.use(errorHandler);

// To get acces to req.cookie
app.use(cookieParser());

// Swagger
// TODO: move this to separate file
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Ministerio Del Interior',
			version: '1.0.0',
			description: 'Grupo 1 - Cliente Servidor 2021 TPI',
		},
		servers: [
			{ url: 'http://localhost:4000' },
			{ url: ' https://cli-serv-grupo1.herokuapp.com' },
		],
	},
	apis: ['./controllers/*.js'],
};
const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
	console.log(`App running on port: ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	server.close(() => {
		process.exit(1);
	});
});
