import { Router } from 'express';
import { trainModel } from '../modules/model/model.controller.js';
import { authenticateJWT, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/train', authenticateJWT, requireAdmin, trainModel);

export default router;
