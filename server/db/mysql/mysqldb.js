var mysql = require('');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'personal_manage',
    port     : 3306,
    char     : 'utf8mb4'
})

connection.connect()

module.exports = connection