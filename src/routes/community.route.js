import express from 'express';
import {
    toggleOutfitLikeController,
    getTodayOutfitStatusController,
    publishTodayOutfitController,
    deletePublishedOutfitController,
    checkTodayOutfitShareabilityController,
    getOutfitTagsController,
    getOutfitDetailController,
    getCommunityOutfitsController,
    getYesterdayTopOutfitsController
} from '../modules/community/community.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 게시글 하트 누르기 / 취소
router.post('/outfits/:outfitId/like', authenticateJWT, toggleOutfitLikeController);

// 오늘의 아웃핏 상태 조회
router.get('/today-outfit-status', authenticateJWT, getTodayOutfitStatusController);

// 오늘의 아웃핏을 바로 커뮤니티에 공개
router.patch('/publish-today-outfit', authenticateJWT, publishTodayOutfitController);

//오늘 아웃핏 등록 여부 true, false 반환 -> 공유 버튼 활성화
router.get('/outfits/today/check', authenticateJWT, checkTodayOutfitShareabilityController);

// 특정 아웃핏의 태그 조회 (mood/purpose 구분) - 구체적인 경로를 먼저
router.get('/outfits/:outfitId/tags', authenticateJWT, getOutfitTagsController);

// 커뮤니티에 공개된 아웃핏 목록 조회 (최신순/인기순 + 태그 필터링)
router.get('/outfits', authenticateJWT, getCommunityOutfitsController);

//top3outfit조회
router.get('/outfits/top3', authenticateJWT,getYesterdayTopOutfitsController);

// 커뮤니티 게시글 상세 조회
router.get('/outfits/:outfitId', authenticateJWT, getOutfitDetailController);

// DELETE /community/outfits/:outfitId
router.delete('/outfits/:outfitId', authenticateJWT, deletePublishedOutfitController);

export default router;
