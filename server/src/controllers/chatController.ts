import { Request, Response } from "express";
import Chat from "../models/Chat";
import { generateAIResponse } from "../services/aiService";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

// Get chat history for a user
export const getChatHistory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error getting chat history:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Process a new message and get AI response
export const processMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, tool, userId, chatId } = req.body;

    // Generate AI response based on the message, selected tool, and chat ID for history
    const aiResponse = await generateAIResponse(message, tool, chatId);

    // If user is logged in, save the conversation
    if (userId && userId !== "undefined") {
      // Update existing chat or create new one
      if (chatId) {
        await Chat.findByIdAndUpdate(chatId, {
          $push: {
            messages: [
              { content: message, role: "user" },
              { content: aiResponse, role: "assistant" },
            ],
          },
          updatedAt: Date.now(),
        });

        res.status(200).json({ reply: aiResponse });
      } else {
        // Create a new chat
        const title =
          message.length > 50 ? message.substring(0, 50) + "..." : message;

        const newChat = await Chat.create({
          userId: new mongoose.Types.ObjectId(userId),
          title,
          tool,
          messages: [
            { content: message, role: "user" },
            { content: aiResponse, role: "assistant" },
          ],
        });

        // Return the new chat ID
        res.status(200).json({
          reply: aiResponse,
          chatId: newChat._id,
        });
      }
    } else {
      res.status(200).json({ reply: aiResponse });
    }
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ message: "Error processing your request" });
  }
};

// Save a chat message for logged-in users
export const saveMessage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { chatId, message, isUserMessage } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const chat = await Chat.findById(chatId);

    // Verify chat belongs to user
    if (!chat || chat.userId.toString() !== userId) {
      res.status(403).json({ message: "Not authorized" });
      return;
    }

    // Add message to chat
    chat.messages.push({
      content: message,
      role: isUserMessage ? "user" : "assistant",
      timestamp: new Date(),
    });

    chat.updatedAt = new Date();
    await chat.save();

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a chat
export const deleteChat = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const chat = await Chat.findById(id);

    // Verify chat belongs to user
    if (!chat || chat.userId.toString() !== userId) {
      res.status(403).json({ message: "Not authorized" });
      return;
    }

    await Chat.findByIdAndDelete(id);
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ message: "Server error" });
  }
};
