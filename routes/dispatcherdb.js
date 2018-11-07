let mysql = require('mysql');

let dispatcherDB = mysql.createConnection({
    host: 'Alfred',
    port: '3306',
    user: 'jpalmstrom',
    password: 'Pa55word',
    database: 'dispatcherdb'
});

module.exports = dispatcherDB;