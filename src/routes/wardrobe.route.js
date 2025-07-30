//src/routes/wardrobe.route.js
import express from 'express';
import {
  getWardrobeItemsController,
  getWardrobeItemDetail,
  getWardrobeItemsByCategoryController,
  deleteWardrobeItemController,
  getWardrobeBrandsByUserController,
  getItemOutfitHistoryController,
  getWardrobeItemsByFilterController,
  autoClassifyItem,
  createItem,
  updateItem
} from '../modules/wardrobe/wardrobe.controller.js';

import { authenticateJWT } from '../middlewares/auth.middleware.js';
import multer from 'multer';


const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/items', authenticateJWT, getWardrobeItemsController);
router.get('/items/categories', authenticateJWT, getWardrobeItemsByCategoryController);
router.get('/items/brands', authenticateJWT, getWardrobeBrandsByUserController);
router.get('/items/filter', authenticateJWT, getWardrobeItemsByFilterController);
router.get('/items/:itemId', authenticateJWT, getWardrobeItemDetail);
router.get('/items/:itemId/outfits', authenticateJWT, getItemOutfitHistoryController);
router.delete('/items/:itemId', authenticateJWT, deleteWardrobeItemController);
router.post('/items/auto-classify', authenticateJWT, upload.single('image'), autoClassifyItem);
router.post('/items', authenticateJWT, createItem);
router.put('/items/:itemId', authenticateJWT, updateItem);
export default router;