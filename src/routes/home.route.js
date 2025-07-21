import express from 'express';
import { getCurrentDateController } from '../modules/home/home.controller.js';
import { getCurrentWeather } from '../modules/weather/weather.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

//router.get('/common/date', authenticateJWT, getCurrentDateController);
router.get('/common/date', getCurrentDateController);
router.get('/weather/current', authenticateJWT, getCurrentWeather);

export default router;