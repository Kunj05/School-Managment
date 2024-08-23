const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: parseInt(process.env.MYSQLPORT, 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// console.log('Database connection pool created with the following configuration:');
// console.log(`Host: ${process.env.MYSQLHOST}`);
// console.log(`User: ${process.env.MYSQLUSER}`);
// console.log(`Database: ${process.env.MYSQL_DATABASE}`);
// console.log(`Port: ${process.env.MYSQLPORT}`);

module.exports = pool;
