const mysql = require("mysql2/promise");

class Database {
  constructor(config) {
    this.pool = mysql.createPool(config);
  }

  async query(sql, params) {
    const result = await this.pool.query(sql, params);
    return result[0];
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = Database;