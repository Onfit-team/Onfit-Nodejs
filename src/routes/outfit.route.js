import express from 'express';
import { 
  createOutfitController,
  getFeelsLikeTempController,
  getTagsController
} from '../modules/outfit/outfit.controller.js';

const router = express.Router();

router.get('/feels-like-options', getFeelsLikeTempController);
router.get('/tags/options', getTagsController);
router.post('/outfits', createOutfitController);

export default router;
