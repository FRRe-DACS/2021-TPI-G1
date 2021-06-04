const swaggerJsDoc = require('swagger-jsdoc');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Ministerio Del Interior',
			version: '1.0.0',
			description: 'Grupo 1 - Cliente Servidor 2021 TPI',
		},
		servers: [{ url: 'http://localhost:4000' }],
	},
	apis: ['../routes/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
