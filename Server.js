const express = require('express');
const Database = require('./db');
var cors = require('cors');
const Header = require('./routes/Header/header');

// const Router = require('./routes/routes');

const PORT = 3001;

class Server {
	constructor(express) {
		this.express = express;
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(Header);
	}

	initDB() {
		const database = new Database();
		database.connect();
	}

	initRouter() {
		const Router = require('./routes/routes');	
		const router = new Router().getRoutes();
		this.app.use(router);
		// this.app.use(Header);

	}

	run() {
		const port = process.env.PORT || 3001;
			this.initDB();
			this.initRouter();
			this.app.listen(port, () => console.log('Server app on PORT', port));
		}
}
module.exports = Server;
