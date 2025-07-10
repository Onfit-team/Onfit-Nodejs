import express from 'express';
import passport from './kakao.strategy.js';

const router = express.Router();

// 카카오 로그인 시작
router.get('/auth/kakao', passport.authenticate('kakao'));

// 콜백 URL
router.get(
  '/auth/kakao/callback',
  passport.authenticate('kakao', { session: false }),
  (req, res) => {
    const { token, user } = req.user;
    res.json({ token, user });
  }
);

export default router;

