let mysql = require('mysql')
import 'dotenv/config'
require('dotenv').config("./phase 1/.env")

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) return console.error(err.message);

    console.log("MySQL Connection: Complete")
});