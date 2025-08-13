import express from "express";
import multer from "multer";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import * as itemController from "../modules/item/item.controller.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const ok = ["image/png", "image/jpeg", "image/webp", "image/jpg"].includes(file.mimetype);
    if (!ok) {
      return cb(new Error("이미지 파일만 업로드 가능합니다."), false);
    }
    cb(null, true);
  },
});

// 아이템 감지 API
router.post("/detect", authenticateJWT, upload.single("image"), itemController.detectItems);

// 아이템 리파인 API
//router.post("/refine", authenticateJWT, itemController.refineItem);
// 아이템 리파인 API (수정)
router.post("/refine", authenticateJWT, upload.none(), itemController.refineItem);

// 아이템 저장 API (수정)
router.post("/save", authenticateJWT, upload.none(), itemController.saveItem);
// 아이템 저장 API
//router.post("/save", authenticateJWT, itemController.saveItem);

// 이미지 업로드 API
router.post("/upload", authenticateJWT, upload.single("image"), itemController.uploadImage);

// 크롭 이미지 삭제 API
router.delete("/:crop_id", authenticateJWT, itemController.deleteCrop);

export default router;