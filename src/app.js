import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import passport from './modules/user/kakao.strategy.js';
import userRoutes from './routes/user.route.js';
import homeRouter from './routes/home.route.js';
import outfitRoutes from './routes/outfit.route.js';
import calendarRoute from './routes/calendar.route.js';
import { errorHandler } from './middlewares/error.middleware.js';
import wardrobeRouter from './routes/wardrobe.route.js';
import itemsRouter from './routes/item.route.js';
import modelRouter from './routes/model.route.js';

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use('/user', userRoutes);
app.use(homeRouter);
app.use(outfitRoutes);
app.use('/calendar', calendarRoute);
app.use('/wardrobe', wardrobeRouter);
app.use('/items', itemsRouter);
app.use('/model', modelRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
