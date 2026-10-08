const express = require('express');
const router = express.Router();
const db = require('../db'); 

// 문자열 결합 쿼리(String Concatenation Query)
router.post('/level1', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username =
                '${username}' AND password = '${password}'`;
    db.query(query, (err, results) => {
        handleResponse(res, err, results);
    });
});

// 입력 필터링 쿼리(Filtered Query)
router.post('/level2', (req, res) => {
    const { username, password } = req.body;
    const safeUser = escapeFilter(username);
    const safePass = escapeFilter(password);

    const query = `SELECT * FROM users WHERE username =
                '${safeUser}' AND password = '${safePass}'`;
    db.query(query, (err, results) => {
        handleResponse(res, err, results);
    });
});

// 매개변수화 쿼리(Prepared Statement)
router.post('/level3', (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.execute(query, [username, password], (err, results) => {
        handleResponse(res, err, results);
    });
});

// 입력값 필터링
const escapeFilter = (input) => {
    if (!input || typeof input !== 'string') return "";
    let safeInput = input
        .replace(/'/g, "\\'")
        .replace(/--/g, "\\--")
        .replace(/#/g, "\\#");
    const sqlKeywords = [/union/gi, /select/gi, /or/gi, /and/gi];
    sqlKeywords.forEach((keyword) => {
        safeInput = safeInput.replace(keyword, "");
    });
    return safeInput;
};

// 공통 응답 처리 함수
function handleResponse(res, err, results) {
    // 1. 시스템 에러 발생 시 (DB 에러 등)
    if (err) {
        return res.status(500).json({
            success: false,
            message: "데이터베이스 요청 중 에러가 발생했습니다.",
            data: err.stack // 실패했을 때 err 메시지가 data에 담겨 출력됨
        });
    }

    // 2. 조회 성공 (데이터가 있을 때)
    if (results.length > 0) {
        return res.json({
            success: true,
            message: "환영합니다.",
            data: results // DB 결과가 data에 담겨 출력됨
        });
    } 
    
    // 3. 조회 성공 (데이터가 없을 때 - 아이디/비밀번호 틀림)
    return res.json({
        success: false,
        message: "아이디 또는 비밀번호가 틀렸습니다.",
        data: [] 
    });
}

module.exports = router;