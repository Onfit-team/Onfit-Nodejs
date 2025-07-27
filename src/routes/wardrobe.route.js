//src/routes/wardrobe.route.js
import express from 'express';
import {
  getWardrobeItemsController,
  getWardrobeItemDetail,
  getWardrobeItemsByCategoryController,
  uploadWardrobeImage,
  getOutfitsByItemController,
} from '../modules/wardrobe/wardrobe.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/items', authenticateJWT, getWardrobeItemsController);
router.get('/items/categories', authenticateJWT, getWardrobeItemsByCategoryController);
router.get('/items/:itemId', authenticateJWT, getWardrobeItemDetail);
router.get('/items/:itemId/outfits', authenticateJWT, getOutfitsByItemController);
router.post('/items', authenticateJWT, upload.single('image'), uploadWardrobeImage);

export default router;
