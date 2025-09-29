const mysql = require('mysql2/promise');

const mySqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'josegarcia99',
    database:'ni_explore_db',
    port:3306
})

module.exports = mySqlPool;