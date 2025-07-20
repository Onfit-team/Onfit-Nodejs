import * as weatherService from './weather.service.js';
import { OkSuccess } from '../../utils/success.js';
import { UserLocationNotFoundError } from '../../utils/error.js';

// 🌤️ 현재 위치 기반 날씨 조회
export const getCurrentWeather = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await weatherService.getCurrentWeatherByUserId(userId);
    res.status(200).json(new OkSuccess(result, "현재 날씨 조회 성공"));
  } catch (err) {
    next(err);
  }
};