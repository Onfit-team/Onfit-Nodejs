import express from 'express';
import passport from '../modules/user/kakao.strategy.js';
import authenticateJWT from '../middlewares/auth.middleware.js';

import { updateNickname, kakaoCallback, checkNickname, } from '../modules/user/user.controller.js';

const router = express.Router();

// 카카오 로그인
router.get('/auth/kakao', passport.authenticate('kakao'));

router.get(
  '/auth/kakao/callback',
  passport.authenticate('kakao', { session: false }),
  kakaoCallback
);

// 닉네임 수정 (JWT 필요)
router.patch('/auth/signup', authenticateJWT, updateNickname);
// 닉네임 중복 확인
router.get('/auth/check-nickname', checkNickname);
export default router;
