import express from 'express';
import { getCurrentDateController } from '../modules/home/home.controller.js';
//import authenticateJWT from '../middlewares/auth.middleware.js';

const router = express.Router();

//router.get('/common/date', authenticateJWT, getCurrentDateController);
router.get('/common/date', getCurrentDateController);



export default router;