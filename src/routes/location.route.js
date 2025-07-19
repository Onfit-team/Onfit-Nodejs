import express from "express";
import { saveCurrentLocation, searchLocation, saveLocation, getMyLocation } from "../modules/location/location.controller.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/search", searchLocation);
router.post("/save", authenticateJWT, saveLocation);
router.get("/my", authenticateJWT, getMyLocation);
router.post("/current", authenticateJWT, saveCurrentLocation);

export default router;
