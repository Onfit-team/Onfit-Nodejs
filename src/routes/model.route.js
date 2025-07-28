import express from 'express';
import multer from 'multer';
import { uploadModel } from '../modules/model/model.controller.js';

const router = express.Router();
const upload = multer(); // memory storage (file.buffer 사용)

router.post('/upload', upload.single('model'), uploadModel);

export default router;
