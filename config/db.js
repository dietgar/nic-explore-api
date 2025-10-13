const mysql = require('mysql2/promise');
const { db } = require('./config');

const mySqlPool = mysql.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port
})

module.exports = mySqlPool;