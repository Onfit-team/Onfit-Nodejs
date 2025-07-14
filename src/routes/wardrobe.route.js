//src/routes/wardrobe.route.js

import express from 'express';
import {
  getWardrobeItemsController,
  getWardrobeItemDetail,
} from '../modules/wardrobe/wardrobe.controller.js';
import authenticate from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/items', authenticate, getWardrobeItemsController);
router.get('/items/:itemId', authenticate, getWardrobeItemDetail); 
export default router;