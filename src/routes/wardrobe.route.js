import express from 'express';
import { getWardrobeItemsController } from '../modules/wardrobe/wardrobe.controller.js';
import authenticate from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/items', authenticate, getWardrobeItemsController);

export default router;
