import express from 'express';
import multer from 'multer';
import { authenticateJWT } from '../middlewares/auth.middleware.js'; // ✅ default import
import * as calendarController from '../modules/calendar/calendar.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get(
  '/outfit/:outfit_id/image',
  authenticateJWT,
  calendarController.getOutfitMainImage
);
router.get(
  '/outfit/:outfit_id/text',
  authenticateJWT,
  calendarController.getOutfitMemo
);

router.put(
  '/outfit/:outfit_id',
  authenticateJWT,
  upload.single('mainImage'),
  calendarController.updateOutfit
);

router.delete(
  '/outfit/:outfit_id',
  authenticateJWT,
  calendarController.deleteOutfit
);

router.patch(
  '/outfit/:outfit_id/feelslike',
  authenticateJWT,
  calendarController.updateFeelsLikeTemp
);

router.get(
  '/outfit/tag/most',
  authenticateJWT,
  calendarController.getTopStyleTag
);

router.get(
  '/outfit/tag/sorted',
  authenticateJWT,
  calendarController.getSortedStyleTags
);

export default router;