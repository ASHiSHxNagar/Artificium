// backend/models/Message.js
import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // or store { role: "user"/"bot", name: "Artificium" }
  },
  text: {
    type: String,
  },
  images: [String],  // array of image URLs if any
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const messageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  // Who sent it? Could be user or "Artificium" bot
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // If it's from the bot, you can store a special role or 'bot' user
  role: {
    type: String,
    enum: ["user", "bot"],
    default: "user",
  },
  // Actual text content
  text: {
    type: String,
  },
  // If message includes images
  images: [String], // store URLs or file paths
  // If you want to store replies as subdocuments
  replies: [replySchema],

  // Another approach: parentMessageId if you prefer a thread approach
  // parentMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
}, {
  timestamps: true, // createdAt, updatedAt
});

export default mongoose.model("Message", messageSchema);
