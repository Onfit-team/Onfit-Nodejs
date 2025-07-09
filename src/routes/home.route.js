const express = require('express');
const router = express.Router();
const homeController = require('../modules/home/home.controller');
//const authMiddleware = require('../../middlewares/auth.middleware');

//router.get('/common/date', authMiddleware, homeController.getCurrentDate);
router.get('/common/date', homeController.getCurrentDate);
module.exports = router;