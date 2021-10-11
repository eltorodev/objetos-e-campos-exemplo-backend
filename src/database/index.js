const mysql = require('mysql2');

async function database(query) {
  const create = mysql.createPool({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_NAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  });

  const pool = create.promise();

  return await pool.query(query);
}

module.exports = database;
