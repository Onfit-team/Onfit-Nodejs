import express from 'express';
import passport from '../modules/user/kakao.strategy.js';
import authenticateJWT from '../middlewares/auth.middleware.js';

import { updateNickname } from '../modules/user/user.controller.js';

const router = express.Router();

// ✅ 카카오 로그인
router.get('/auth/kakao', passport.authenticate('kakao'));

router.get(
  '/auth/kakao/callback',
  passport.authenticate('kakao', { session: false }),
  (req, res) => {
    const { token, user } = req.user;
    res.json({ token, user });
  }
);

// ✅ 닉네임 수정 (JWT 필요)
router.patch('/auth/signup', authenticateJWT, updateNickname);

export default router;
