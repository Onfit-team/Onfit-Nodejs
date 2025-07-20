import express from 'express';
import {
  getWardrobeItemsController,
  getWardrobeItemDetail,
} from '../modules/wardrobe/wardrobe.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/items', authenticateJWT, getWardrobeItemsController);
router.get('/items/:itemId', authenticateJWT, getWardrobeItemDetail);

export default router;
