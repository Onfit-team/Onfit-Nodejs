import express from 'express';
import {
    toggleOutfitLikeController,
    getPublishedOutfitsByOutfitTagsController,
    getTodayOutfitStatusController,
    publishTodayOutfitController,
    deletePublishedOutfitController,
    checkTodayOutfitShareabilityController
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

// DELETE /community/outfits/:outfitId
router.delete('/outfits/:outfitId', authenticateJWT, deletePublishedOutfitController);

//오늘 아웃핏 등록 여부 true, false 반환 -> 공유 버튼 활성화
router.get('/outfits/today/check', authenticateJWT, checkTodayOutfitShareabilityController);

export default router;