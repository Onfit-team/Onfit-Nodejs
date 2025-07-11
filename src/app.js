import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import passport from './modules/user/kakao.strategy.js'; // 초기화
import userRoutes from './routes/user.route.js';
import homeRouter from './routes/home.route.js';
import outfitRoutes from './routes/outfit.route.js';
import { errorHandler } from './middlewares/error.middleware.js';


const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use('/user', userRoutes);
app.use(homeRouter);
app.use(outfitRoutes);

app.use(errorHandler); // 라우터 맨 아래에 추가

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

