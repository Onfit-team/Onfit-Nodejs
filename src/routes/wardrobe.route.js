//src/routes/wardrobe.route.js
import express from 'express';
import {
  getWardrobeItemsController,
  getWardrobeItemDetail,
  getWardrobeItemsByCategoryController,
  uploadWardrobeImage,
  deleteWardrobeItemController,
  getWardrobeItemsByFilterController
} from '../modules/wardrobe/wardrobe.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import multer from 'multer';


const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/items', authenticateJWT, getWardrobeItemsController);
router.get('/items/categories', authenticateJWT, getWardrobeItemsByCategoryController);
router.get('/items/filter', authenticateJWT, getWardrobeItemsByFilterController);
router.get('/items/:itemId', authenticateJWT, getWardrobeItemDetail);
router.post('/items', authenticateJWT, upload.single('image'), uploadWardrobeImage);
router.delete('/items/:itemId', authenticateJWT, deleteWardrobeItemController);

export default router;
