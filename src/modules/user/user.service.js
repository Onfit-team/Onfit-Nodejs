import jwt from 'jsonwebtoken';
import { userRepository } from './user.repository.js';
import { createUserDTO } from './user.dto.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const userService = {
  async loginWithKakao(kakaoProfile) {
    const dto = createUserDTO(kakaoProfile);
    let user = await userRepository.findByEmail(dto.email);

    if (!user) {
      user = await userRepository.create(dto);
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { token, user };
  },

  async updateNickname(userId, newNickname) {
    return await userRepository.updateNickname(userId, newNickname);
  },

  async checkNicknameAvailability(nickname) {
  if (!nickname || nickname.trim() === "") {
    throw new Error("닉네임이 유효하지 않습니다.");
  }
  const taken = await userRepository.isNicknameTaken(nickname);
  return taken;
}

};
