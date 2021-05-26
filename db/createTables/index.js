const { Pool } = require('pg');

class DBTable {
	constructor(pool) {
		this.pool = pool;
	}

	setPool(pool) {
		this.pool = pool;
	}

	async createTables() {
		try {
			await this.createUsersTable();
			console.log('createTables successes!');
		} catch (err) {
			console.log('createTables failed!', err);
		}
	}

	async createUsersTable() {
		try {
			const usersTable = await this.pool.query(`
            CREATE TABLE IF NOT EXISTS users(
				id SERIAL PRIMARY KEY,
                user_id INT,
                phone INT,
                first_name TEXT,
                last_name TEXT,
                birthday TEXT,
                additional_comments TEXT)
            `);
			console.log('createUsersTable successes!');
		} catch (err) {
			console.log('createUsersTable failed', err);
		}
	}
}
module.exports = DBTable;
