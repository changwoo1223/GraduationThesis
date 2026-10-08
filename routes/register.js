const express = require('express');
const router = express.Router();
const db = require('../db'); 

// 문자열 결합 쿼리(String Concatenation Query)
router.post('/level1', (req, res) => {
    const { username, password, email } = req.body;
    const checkQuery = `SELECT * FROM users WHERE username = '${username}'`; 
    db.query(checkQuery, (err, results) => {
        if (err) {
            return res.status(500).send(err.stack);
        }
        if (results.length > 0) {
            return res.status(400).send("존재하는 아이디입니다.");
        }

        const insertQuery = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;
        db.query(insertQuery, (insertErr, result) => {
            if (insertErr) {
                return res.status(500).send(insertErr.stack);
            }
            res.json({ success: true, message: "회원가입 성공!" });
        });
    });
});

// 입력 필터링 쿼리(Filtered Query)
router.post('/level2', (req, res) => {
    const { username, password, email } = req.body;
    // 특수문자 및 주석 기호 우회 방어 필터 함수
    const escapeFilter = (input) => {
        if (!input) return "";
        return input
            .replace(/'/g, "\\'")
            .replace(/--/g, "\\--")
            .replace(/#/g, "\\#");
    };
    // 필터링 함수를 거쳐 안전해진 변수 선언
    const safeUser = escapeFilter(username);
    const safePass = escapeFilter(password);
    const safeEmail = escapeFilter(email);

    const checkQuery = `SELECT * FROM users WHERE username = '${safeUser}'`;
    db.query(checkQuery, (err, results) => {
        if (err) {
            return res.status(500).send(err.stack);
        }
        if (results.length > 0) {
            return res.status(400).send("존재하는 아이디입니다.");
        }

        const insertQuery = `INSERT INTO users (username, password, email) VALUES ('${safeUser}', '${safePass}', '${safeEmail}')`;
        db.query(insertQuery, (insertErr, result) => {
            if (insertErr) {
                return res.status(500).send(insertErr.stack);
            }
            res.json({ success: true, message: "회원가입 성공!" });
        });
    });
});

// 매개변수화 쿼리(Prepared Statement)
router.post('/level3', (req, res) => {
    const { username, password, email } = req.body;
    const checkQuery = "SELECT * FROM users WHERE username = ?";
    db.execute(checkQuery, [username], (err, results) => {
        if (err) {
            return res.status(500).send(err.stack);
        }
        if (results.length > 0) {
            return res.status(400).send("존재하는 아이디입니다.");
        }

        const insertQuery = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
        db.execute(insertQuery, [username, password, email], (insertErr, result) => {
            if (insertErr) {
                return res.status(500).send(insertErr.stack);
            }
            res.json({ success: true, message: "회원가입 성공!" });
        });
    });
});

module.exports = router;