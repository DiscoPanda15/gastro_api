const mysql = require('mysql');
const config = require('./config');

const conn = mysql.createConnection({
	host: config.HOST,
	user: config.USER,
	password: config.PASSWORD,
	database: config.DB
});

module.exports = conn;