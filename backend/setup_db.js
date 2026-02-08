const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    multipleStatements: true
};

const db = mysql.createConnection(dbConfig);

const sqlPath = path.join(__dirname, '../database.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL server');

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL script:', err);
            process.exit(1);
        }
        console.log('Database and Tables created successfully');
        console.log(result);
        db.end();
    });
});
