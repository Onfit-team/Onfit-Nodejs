import express from 'express';
import multer from 'multer';
import { authenticateJWT, requireAdmin } from '../middlewares/auth.middleware.js';
import * as modelController from '../modules/model/model.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/upload',
  authenticateJWT,
  requireAdmin,      // 관리자 권한 체크
  upload.single('model'),
  modelController.uploadBestModel
);

export default router;
