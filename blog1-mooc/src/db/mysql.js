const { MYSQL_CONFIG } = require('../conf/db')
const mysql = require('mysql')

var connection = mysql.createConnection(MYSQL_CONFIG);

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, function (error, results) {
            if (error) {
                reject(error)
            }
            resolve(results)
        });
    })
    return promise
}

module.exports = {
    exec
}