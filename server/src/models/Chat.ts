import mongoose, { Document, Schema } from "mongoose";

interface IMessage {
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  messages: IMessage[];
  tool: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    default: "New Chat",
  },
  messages: [MessageSchema],
  tool: {
    type: String,
    enum: [
      "swot",
      "pestle",
      "porter-five",
      "ansoff",
      "bcg",
      "marketing-mix",
      null,
    ],
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IChat>("Chat", ChatSchema);
