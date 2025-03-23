import express from "express";
import * as userController from "../controllers/userController";
import auth from "../middleware/auth";

const router = express.Router();

// Register user
router.post("/register", userController.registerUser);

// Get user profile (protected)
router.get("/profile", auth, userController.getUserProfile);

export default router;
