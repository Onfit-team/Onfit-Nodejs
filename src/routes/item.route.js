import express from "express";
import multer from "multer";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import * as itemController from "../modules/item/item.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/detect", authenticateJWT, upload.single("photo"), itemController.detectItems);
router.post("/refine", authenticateJWT, itemController.refineItem);
router.post("/save", authenticateJWT, itemController.saveItem);
router.post("/upload", authenticateJWT, upload.single("image"), itemController.uploadImage);
router.delete("/:crop_id", authenticateJWT, itemController.deleteCrop);

export default router;
