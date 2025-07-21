//src/routes/wardrobe.route.js
import express from 'express';
import {
  getWardrobeItemsController,
  getWardrobeItemDetail,
  getWardrobeItemsByCategoryController,
} from '../modules/wardrobe/wardrobe.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/items', authenticateJWT, getWardrobeItemsController);
router.get('/items/categories', authenticateJWT, getWardrobeItemsByCategoryController);
router.get('/items/:itemId', authenticateJWT, getWardrobeItemDetail);

export default router;
