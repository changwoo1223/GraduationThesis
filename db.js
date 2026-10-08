const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'graduation_project_db'
});

db.connect((err) => {
    if (err) {
        console.error('데이터베이스 연결 실패:', err);
        throw err;
    }
    console.log('MySQL 데이터베이스 연결');
});

module.exports = db;