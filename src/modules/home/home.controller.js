import { getCurrentDate } from './home.service.js';
import { OkSuccess } from '../../utils/success.js';
import { InvalidInputError } from '../../utils/error.js';

export const getCurrentDateController = (req, res, next) => {
  try {
    // 필요시 인증된 사용자 정보 사용: req.user
    const date = getCurrentDate();

    // 성공 응답 (통일된 포맷)
    res.status(200).json(new OkSuccess({ date }, "현재 날짜 조회 성공"));
  } catch (err) {
    // 예외 발생 시 에러 미들웨어로 전달
    next(new InvalidInputError("현재 날짜 조회 실패", err));
  }
};
