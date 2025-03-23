const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { cleanupChatSessions } = require("./services/aiService");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Basic route
app.get("/", (req, res) => {
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
