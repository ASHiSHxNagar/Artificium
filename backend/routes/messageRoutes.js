import express from "express";
import mongoose from "mongoose";
import Message from "../Schema/Message.js";

const router = express.Router();

// Send a new message
router.post("/send", async (req, res) => {
  try {
    const { chatId, text, temporaryId } = req.body;

    if (!chatId || !text) {
      return res.status(400).json({ error: "Chat ID and text are required" });
    }

    const message = new Message({
      chatId,
      text,
      temporaryId,
      images: [], // Start with empty array; updated later with S3 URL
      sender: "user",
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

// Reply to a message
router.post("/reply", async (req, res) => {
  try {
    const { messageId, text, temporaryId } = req.body;

    if (!messageId || !text) {
      return res.status(400).json({ error: "Message ID and text are required" });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    const reply = {
      text,
      temporaryId,
      images: [], // Start with empty array
      sender: "user",
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

// Fetch messages for a chat (unchanged)
router.get("/chats/:chatId/messages", async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ error: "Invalid chat ID" });
    }

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Find message by temporaryId
router.get("/findmessage/:temp", async (req, res) => {
  try {
    const { temp } = req.params;
    if (!temp) {
      return res.status(400).json({ error: "Temporary ID is required" });
    }

    const message = await Message.findOne({ temporaryId: temp });
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Error finding message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add image to message (unchanged)
router.put("/addimage/:id", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const { id } = req.params;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { $push: { images: imageUrl } },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({
      success: true,
      message: "Image added",
      updatedMessage,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;