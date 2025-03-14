import express from "express";
import mongoose from "mongoose";
import ArtificiumConversation from "../Schema/ArtificiumConversation.js";
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

router.post("/send", upload.single("image"), async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!chatId || !text) {
      return res.status(400).json({ error: "Chat ID and text are required" });
    }

    let conversation = await ArtificiumConversation.findOne({ chatId });
    if (!conversation) {
      conversation = new ArtificiumConversation({ chatId, messages: [] });
    }

    const userMessage = {
      text,
      image,
      sender: "user",
    };
    conversation.messages.push(userMessage);

    // Bot response: echo the user's input and duplicate the image
    const botMessage = {
      text,
      image: image ? image : null,
      sender: "bot",
    };
    conversation.messages.push(botMessage);

    await conversation.save();

    setTimeout(() => {
      res.status(200).json({
        success: true,
        conversation,
      });
    }, 2000);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/conversation/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    const conversation = await ArtificiumConversation.findOne({ chatId });
    res.status(200).json({
      success: true,
      conversation: conversation || { messages: [] },
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/regenerate", async (req, res) => {
  try {
    const { chatId, messageId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ error: "Invalid message ID" });
    }

    const conversation = await ArtificiumConversation.findOne({ chatId });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const messageIndex = conversation.messages.findIndex(
      (msg) => msg._id.toString() === messageId
    );
    if (messageIndex === -1 || conversation.messages[messageIndex].sender !== "bot") {
      return res.status(404).json({ error: "Bot message not found" });
    }

    // Find the preceding user message to regenerate the bot response
    const userMessageIndex = messageIndex - 1;
    if (userMessageIndex < 0 || conversation.messages[userMessageIndex].sender !== "user") {
      return res.status(400).json({ error: "No preceding user message found" });
    }

    const userMessage = conversation.messages[userMessageIndex];
    const regeneratedBotMessage = {
      text: userMessage.text,
      image: userMessage.image ? userMessage.image : null,
      sender: "bot",
    };

    conversation.messages[messageIndex] = regeneratedBotMessage;
    await conversation.save();

    setTimeout(() => {
      res.status(200).json({
        success: true,
        conversation,
      });
    }, 2000);
  } catch (error) {
    console.error("Error regenerating message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;