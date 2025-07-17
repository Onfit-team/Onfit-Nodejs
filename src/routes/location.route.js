import express from "express";
import { searchLocation, saveLocation } from "../modules/location/location.controller.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/search", searchLocation);
router.post("/save", authenticateJWT, saveLocation);
export default router;
