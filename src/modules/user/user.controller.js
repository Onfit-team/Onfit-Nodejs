import { userService } from './user.service.js';
import {
  AuthUpdateSuccess,
  AuthLoginSuccess,
  AuthNicknameCheckSuccess,
} from '../../utils/success.js';
import {
  AuthUpdateFailedError,
  AuthNicknameCheckFailedError,
} from '../../utils/error.js';


//닉네임 변경 (PATCH /user/auth/signup)
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


//카카오 콜백 로그인 처리 (/user/auth/kakao/callback)
export const kakaoCallback = (req, res, next) => {
  try {
    const { token, user } = req.user;
    res.status(200).json(new AuthLoginSuccess({ token, user }));
  } catch (err) {
    next(err);
  }
};

//닉네임 중복 확인(GET /user/auth/check-nickname?nickname=닉네임)
export const checkNickname = async (req, res, next) => {
  try {
    const { nickname } = req.query;

    if (!nickname) {
      throw new AuthNicknameCheckFailedError("닉네임이 필요합니다");
    }

    const isTaken = await userService.checkNicknameAvailability(nickname);

    const response = isTaken
      ? { available: false, message: "이미 사용 중인 닉네임입니다." }
      : { available: true };

    res.status(200).json(new AuthNicknameCheckSuccess(response));
  } catch (err) {
    next(err);
  }
};