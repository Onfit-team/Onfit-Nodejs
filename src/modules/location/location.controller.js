import { validateSearchQuery } from "./location.dto.js";
import { searchLocationService, saveLocationService, getMyLocationService, saveCurrentLocationService } from "./location.service.js";
import { OkSuccess, CreatedSuccess } from "../../utils/success.js";
import { InvalidInputError, LocationNotFoundError} from "../../utils/error.js";

export const searchLocation = async (req, res, next) => {
  try {
    const query = validateSearchQuery(req.query.query);
    const result = await searchLocationService(query);
    res.status(200).json(new OkSuccess(result));
  } catch (err) {
    next(err);
  }
};

export const saveLocation = async (req, res, next) => {
  try {
    const { query } = req.body;
    const userId = req.user.userId; // 인증 미들웨어에서 세팅됨

    if (!query) {
      throw new InvalidInputError("위치 정보가 누락되었습니다.");
    }

    const result = await saveLocationService(userId, query);
    res.status(201).json(new CreatedSuccess(result));
  } catch (error) {
    next(error);
  }
};

export const getMyLocation = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const locationDTO = await getMyLocationService(userId);
    res.status(200).json(new OkSuccess(locationDTO));
  } catch (error) {
    next(error);
  }
};

export const saveCurrentLocation = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.user.userId;


    // 위도/경도 누락 체크
    if (latitude == null || longitude == null) {
      throw new InvalidInputError("위치 정보가 누락되었습니다.");
    }

    const result = await saveCurrentLocationService(userId, latitude, longitude);
    res.status(201).json(new CreatedSuccess(result));
  } catch (err) {
    // 좌표 오류 판단 (카카오 응답 없음 등)
    if (err.name === "LocationNotFoundError") {
      return res.status(404).json({
        isSuccess: false,
        code: err.errorCode,
        message: err.message,
        result: null
      });
    }
    next(err);
  }
};