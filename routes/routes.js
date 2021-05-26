const express = require('express');

const userRoutes = require('../routes/api/Users/users');

class Router {
	constructor() {}

	getRoutes() {
		const router = express.Router();
		router.use('/users', userRoutes);
		return router;
	}
}

module.exports = Router;
