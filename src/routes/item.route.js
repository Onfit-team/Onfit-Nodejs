import express from 'express';
import multer from 'multer';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import * as itemController from '../modules/item/item.controller.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ✅ 1단계: 사진 업로드 + 크롭
router.post('/detect', authenticateJWT, upload.single('photo'), itemController.detectItems);

// ✅ 2단계: DALL·E 리파인
router.post('/refine', authenticateJWT, itemController.refineItem);

// ✅ 3단계: 최종 저장
router.post('/save', authenticateJWT, itemController.saveItem);

export default router;
