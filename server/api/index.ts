import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import { cleanupChatSessions } from "./services/aiService";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: (process.env.CLIENT_URL as string) || "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["*"],
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = process.env.MONGODB_URI as string;

async function run() {
  try {
    // Create a Mongoose client with the serverApi option directly in the connect call
    await mongoose.connect(uri, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    });
    await mongoose.connection.db?.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (e) {
    console.error("MongoDB connection error:", e);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Basic route
app.get("/", (_req: Request, res: Response) => {
  res.send("BizIntel API is running");
});

// Set up scheduled cleanup for chat sessions (every 6 hours)
setInterval(() => {
  cleanupChatSessions();
  console.log("Cleaned up old chat sessions");
}, 6 * 60 * 60 * 1000);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
