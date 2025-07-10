import { userService } from './user.service.js';

export const updateNickname = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { nickname } = req.body;

    if (!nickname) {
      return res.status(400).json({ message: '닉네임은 필수입니다.' });
    }

    const updatedUser = await userService.updateNickname(userId, nickname);

    res.json({
      message: '닉네임이 수정되었습니다.',
      user: updatedUser
    });
  } catch (err) {
    console.error('닉네임 수정 오류:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

