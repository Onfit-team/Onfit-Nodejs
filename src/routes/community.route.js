import express from 'express';
import {
    toggleOutfitLikeController,
    getPublishedOutfitsByOutfitTagsController,
    getTodayOutfitStatusController,
    publishTodayOutfitController
} from '../modules/community/community.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 게시글 하트 누르기 / 취소
router.post('/outfits/:outfitId/like', authenticateJWT, toggleOutfitLikeController);
router.get('/outfits/filter/outfit-tags', authenticateJWT, getPublishedOutfitsByOutfitTagsController);

// 오늘의 아웃핏 상태 조회
router.get('/today-outfit-status', authenticateJWT, getTodayOutfitStatusController);

// 오늘의 아웃핏을 바로 커뮤니티에 공개
router.patch('/publish-today-outfit', authenticateJWT, publishTodayOutfitController);

export default router;