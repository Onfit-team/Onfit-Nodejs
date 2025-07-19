import express from 'express';
import multer from 'multer';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import * as itemController from '../modules/item/item.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/crop',
  authenticateJWT,
  upload.single('photo'),
  itemController.cropAndSave
);

router.delete(
  '/:item_id',
  authenticateJWT,
  itemController.removeItem
);

export default router;
