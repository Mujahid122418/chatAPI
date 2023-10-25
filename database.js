const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'evvapi-database.civasuibl9t3.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'egOmNo0hkDP11w',
    database: 'nodejsApi',
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
});

exports.connection = connection;
