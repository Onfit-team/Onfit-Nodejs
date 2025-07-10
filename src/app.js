import express from 'express';
import passport from './modules/user/kakao.strategy.js'; // 초기화
import userRoutes from './routes/user.route.js';
import dotenv from "dotenv";
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

app.use(errorHandler); // 라우터 맨 아래에 추가