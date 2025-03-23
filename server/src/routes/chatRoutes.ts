import express from "express";
import * as chatController from "../controllers/chatController";
import auth from "../middleware/auth";

const router = express.Router();

// Get chat history for a user
router.get("/history", auth, chatController.getChatHistory);

// Send a new message
router.post("/message", chatController.processMessage);

// Save a chat message for logged-in users
router.post("/save", auth, chatController.saveMessage);

// Delete a chat
router.delete("/:id", auth, chatController.deleteChat);

export default router;
