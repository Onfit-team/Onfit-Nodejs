import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { userService } from './user.service.js';

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: process.env.KAKAO_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await userService.loginWithKakao(profile);
        done(null, result); // { token, user }
      } catch (err) {
        done(err);
      }
    }
  )
);

export default passport;
