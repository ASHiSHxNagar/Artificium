import express from "express";
import mongoose from "mongoose";
import Message from "../Schema/Message.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG, JPG, and JPEG files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

const router = express.Router();

// Send a new message with optional image
router.post("/send", upload.single("image"), async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!chatId || !text) {
      return res.status(400).json({ error: "Chat ID and text are required" });
    }

    const message = new Message({
      chatId,
      text,
      images: image ? [image] : [], // Store image path if uploaded
      sender: "user", // Assuming sender is user for simplicity
    });

    await message.save();

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reply to a message with optional image
router.post("/reply", upload.single("image"), async (req, res) => {
  try {
    const { messageId, text } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!messageId || !text) {
      return res.status(400).json({ error: "Message ID and text are required" });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    const reply = {
      text,
      images: image ? [image] : [], // Store image path if uploaded
      sender: "user", // Assuming sender is user for simplicity
    };

    message.replies.push(reply);
    await message.save();

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Error replying to message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;