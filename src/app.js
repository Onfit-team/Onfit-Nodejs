import dotenv from 'dotenv';
dotenv.config(); // 반드시 최상단

import express from 'express';
import passport from './modules/user/kakao.strategy.js'; // 초기화
import path from 'path';
import { fileURLToPath } from 'url';
import calendarRoute from './routes/calendar.route.js';
import { errorHandler } from './middlewares/error.middleware.js';
import userRoutes from './routes/user.route.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(passport.initialize());

app.use('/user', userRoutes);
app.use('/calendar', calendarRoute);


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

app.use(errorHandler); // 라우터 맨 아래에 추가