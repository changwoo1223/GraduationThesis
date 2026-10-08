const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
app.use('/login', loginRouter);
app.use('/register', registerRouter);


app.listen(3000, () => {
    console.log('웹 서버 실행: http://localhost:3000/login.html');
});