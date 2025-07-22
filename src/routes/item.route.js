import express from 'express';
import multer from 'multer';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import * as itemController from '../modules/item/item.controller.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// 이미지 분석 (YOLO)
router.post(
  '/crop',
  authenticateJWT,
  upload.single('photo'),               // photo 필드로 이미지 업로드
  itemController.cropAndSave
);

// 선택된 크롭 스타일 변환
router.post(
  '/transform',
  authenticateJWT,
  itemController.transformSelectedCrop
);

// 아이템 삭제
router.delete(
  '/:item_id',
  authenticateJWT,
  itemController.removeItem
);

export default router;
