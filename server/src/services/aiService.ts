import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from "@google/generative-ai";
import { toolSystemPrompts } from "./geminiPrompts";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

interface ChatSessionWithTimestamp extends ChatSession {
  lastActive: number;
}

// Create a map to store chat sessions
const chatSessions = new Map<string, ChatSessionWithTimestamp>();

// Generate AI response using Gemini API
export const generateAIResponse = async (
  message: string,
  tool: string | null = null,
  chatId: string | null = null
): Promise<string> => {
  try {
    // Get the text generation model (Gemini Pro)
    const model: GenerativeModel = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-8b",
    });

    // System prompt depends on whether a tool is being used
    let systemPrompt = `You are an AI assistant specializing in business management concepts from Paul Hoang's Business Management 5th Edition textbook. Format your response using markdown for better readability.`;

    if (tool && toolSystemPrompts[tool]) {
      systemPrompt = toolSystemPrompts[tool];
    }

    // Initialize chat if chatId exists and is not in the map
    if (chatId && !chatSessions.has(chatId)) {
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: "I need help with business management concepts from Paul Hoang's textbook",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "I'd be happy to help you with business management concepts from Paul Hoang's Business Management 5th Edition textbook. What specific topic or question would you like to explore?",
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
      });

      // Add lastActive property to the chat object
      const chatWithTimestamp = chat as ChatSessionWithTimestamp;
      chatWithTimestamp.lastActive = Date.now();

      chatSessions.set(chatId, chatWithTimestamp);
    }

    let response;

    // If we have an existing chat session, use it for continuity
    if (chatId && chatSessions.has(chatId)) {
      const chat = chatSessions.get(chatId) as ChatSessionWithTimestamp;

      // Update last active time
      chat.lastActive = Date.now();

      // Always include the system prompt for tool-based analyses
      if (tool) {
        response = await chat.sendMessage(
          `${systemPrompt}\n\nAnalyze this: ${message}`
        );
      } else {
        response = await chat.sendMessage(message);
      }
    } else {
      // For one-off messages without history
      response = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
          {
            role: "model",
            parts: [
              {
                text: "I understand. I'll respond according to Paul Hoang's Business Management textbook and provide well-structured information.",
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
      });
    }

    const text = response.response.text();
    return text;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I apologize, but I encountered an error processing your request. Please try again later.";
  }
};

// Clean up old chat sessions
export const cleanupChatSessions = (): void => {
  // Remove chat sessions older than 24 hours
  const now = Date.now();
  for (const [chatId, session] of chatSessions.entries()) {
    if (now - session.lastActive > 24 * 60 * 60 * 1000) {
      chatSessions.delete(chatId);
    }
  }
};
