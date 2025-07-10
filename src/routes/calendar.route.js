import express from 'express';
import multer from 'multer';
import * as calendarController from '../modules/calendar/calendar.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/outfit/:outfit_id/image', calendarController.getOutfitMainImage);
router.get('/outfit/:outfit_id/text', calendarController.getOutfitMemo);

router.put(
  '/outfit/:outfit_id',
  upload.single('mainImage'),
  calendarController.updateOutfit
);

router.delete('/outfit/:outfit_id', calendarController.deleteOutfit);

export default router;
