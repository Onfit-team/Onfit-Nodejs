// app.js (또는 server.js)
const express = require('express');
const app = express();

const homeRouter = require('./routes/home.route.js');
app.use(homeRouter);

app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});

