import express from 'express';
import { 
  createOutfitController,
  getFeelsLikeTempController,
  getTagsController,
  testLocationController
} from '../modules/outfit/outfit.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.get('/feels-like-options', getFeelsLikeTempController);
router.get('/tags/options', getTagsController);

// 인증 필요
router.post('/outfits', authenticateJWT, createOutfitController);

router.get('/outfit/test-location', authenticateJWT, testLocationController);

export default router;
