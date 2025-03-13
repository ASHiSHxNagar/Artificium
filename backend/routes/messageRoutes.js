import express from "express";
import mongoose from "mongoose";
import Message from "../Schema/Message.js";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = express.Router();

// POST /api/messages/send - Send a main message
router.post("/send", upload.single("image"), async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate input
    if (!chatId || !text) {
      return res.status(400).json({ error: "Chat ID and text are required" });
    }

    // For now, use a hardcoded user ID (replace with authenticated user)
    const senderId = "60d0fe4f5311236168a109ca"; // Replace with req.user._id in production

    const newMessage = new Message({
      chat: chatId,
      sender: senderId,
      text,
      image,
      replies: [],
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/messages/reply - Send a reply to a message
router.post("/reply", upload.single("image"), async (req, res) => {
  try {
    const { chatId, messageId, text } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate input
    if (!chatId || !messageId || !text) {
      return res
        .status(400)
        .json({ error: "Chat ID, message ID, and text are required" });
    }

    // Find the message
    const message = await Message.findOne({ _id: messageId, chat: chatId });
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // For now, use a hardcoded user ID (replace with authenticated user)
    const senderId = "60d0fe4f5311236168a109ca"; // Replace with req.user._id in production

    // Add the reply to the message's replies array
    const reply = {
      text,
      sender: senderId,
      image,
      createdAt: new Date(),
    };
    message.replies.push(reply);

    await message.save();

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Error sending reply:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;