import express from "express";
import multer from "multer";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import * as itemController from "../modules/item/item.controller.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const ok = ["image/png","image/jpeg","image/webp","image/jpg"].includes(file.mimetype);
    cb(ok ? null : new Error("이미지 파일만 업로드 가능합니다."));
  },
});

router.post("/detect", authenticateJWT, upload.single("image"), itemController.detectItems);
router.post("/refine", authenticateJWT, itemController.refineItem);
router.post("/save", authenticateJWT, itemController.saveItem);
router.post("/upload", authenticateJWT, upload.single("image"), itemController.uploadImage);
router.delete("/:crop_id", authenticateJWT, itemController.deleteCrop);

export default router;
