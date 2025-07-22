import express from 'express';
import { getCurrentDateController } from '../modules/home/home.controller.js';
import { getCurrentWeather } from '../modules/weather/weather.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { getCurrentDateController, getSimilarWeatherOutfitsController } from '../modules/home/home.controller.js';
import { getCurrentWeather, getTomorrowWeather} from '../modules/weather/weather.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

//router.get('/common/date', authenticateJWT, getCurrentDateController);
router.get('/common/date', getCurrentDateController);
router.get('/weather/current', authenticateJWT, getCurrentWeather);
router.get('/weather/tomorrow', authenticateJWT, getTomorrowWeather);
router.get('/home/similar-weather', authenticateJWT, getSimilarWeatherOutfitsController);

export default router;