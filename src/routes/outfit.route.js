import express from 'express';
import { 
  createOutfitController,
  getFeelsLikeTempController,
  getTagsController,
  getDevModeStatus,
  toggleDevMode
} from '../modules/outfit/outfit.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.get('/feels-like-options', getFeelsLikeTempController);
router.get('/tags/options', getTagsController);
router.get('/dev-mode-status', getDevModeStatus); // 개발 모드 상태 확인 (인증 불필요)
router.post('/dev-mode/toggle', toggleDevMode); // 개발 모드 토글 (인증 불필요)

// 인증 필요
router.post('/outfits', authenticateJWT, createOutfitController);

export default router;
