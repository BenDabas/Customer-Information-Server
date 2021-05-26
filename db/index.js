const { Pool, Client } = require('pg');
const config = require('../config');
const DBTable = require('./createTables');

class Database {
  // static instance = Database;
  pool = new Pool();
  client = new Client();
  dbTable = new DBTable(this.pool);

  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }
    this.constructor.instance = this;
  }

  /**
   * Singleton instance.
   */
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect() {
    try {
      this.pool = new Pool({
        host: config.db_host,
        database: config.db_database,
        user: config.db_user,
        password: config.db_password,
        port: config.db_port,
      });
      console.log('Connected to DB');

      this.client = await this.pool.connect();
      console.log(this.client);

      this.dbTable.setPool(this.pool);
      await this.dbTable.createTables();
    } catch (err) {
      console.log('Connect to DB failed', err);
    }
  }

  async createUserForFirstConnection() {
    try {
      await this.pool.query(
        `INSERT INTO users (user_id, phone, first_name, last_name, birthday, additional_comments)
				VALUES($1,$2,$3,$4,$5,$6)
				ON CONFLICT DO NOTHING`,
        [313203374, 454445, 'Ben', 'Dabas', '9.2.1996', 'No']
      );
    } catch (err) {
      logger.error(
        `db/index.js, createUserForConnection Error: ${err.message}`
      );
    }
  }
}

module.exports = Database;
