import { getAllWardrobeItems } from './wardrobe.service.js';

export const getWardrobeItemsController = async (req, res, next) => {
  try {
    const userId = req.user.id; // 로그인된 사용자 정보
    const items = await getAllWardrobeItems(userId);

    res.json(items); // 응답 포맷 그대로 전송
  } catch (err) {
    next(err); // 에러 미들웨어로 전달
  }
};
