const Database = require('../db');

const { Pool } = require('pg');

/**
 * @description Service class represent a Service with pooling methods
 * @private {Pool} pool
 * @example class UserService extends Service
 */
class Service {
  pool = new Pool();
  constructor() {
    const database = new Database();
    this.pool = database.pool;
  }
}

module.exports = Service;
