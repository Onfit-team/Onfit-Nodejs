import express from 'express';
import {
    toggleOutfitLikeController,
    getPublishedOutfitsByOutfitTagsController
} from '../modules/community/community.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 게시글 하트 누르기 / 취소
router.post('/outfits/:outfitId/like', authenticateJWT, toggleOutfitLikeController);
router.get('/outfits/filter/outfit-tags', authenticateJWT, getPublishedOutfitsByOutfitTagsController);

export default router;