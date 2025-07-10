import { userService } from './user.service.js';
import {
  AuthUpdateSuccess,
  AuthLoginSuccess,
} from '../../utils/success.js';
import {
  AuthUpdateFailedError,
} from '../../utils/error.js';

/**
 * 닉네임 변경 (PATCH /user/auth/signup)
 */
export const updateNickname = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { nickname } = req.body;

    if (!nickname) {
      throw new AuthUpdateFailedError("닉네임은 필수입니다.");
    }

    const updatedUser = await userService.updateNickname(userId, nickname);

    res.status(200).json(new AuthUpdateSuccess(updatedUser));
  } catch (err) {
    next(err); // 에러 미들웨어로 넘김
  }
};

/**
 * 카카오 콜백 로그인 처리 (/user/auth/kakao/callback)
 */
export const kakaoCallback = (req, res, next) => {
  try {
    const { token, user } = req.user;
    res.status(200).json(new AuthLoginSuccess({ token, user }));
  } catch (err) {
    next(err);
  }
};