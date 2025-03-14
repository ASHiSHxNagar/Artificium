import express from "express";
import mongoose from "mongoose";
import ArtificiumConversation from "../Schema/ArtificiumConversation.js";

const router = express.Router();

// Send a new message
router.post("/send", async (req, res) => {
  try {
    const { chatId, text, temporaryId } = req.body;

    if (!chatId || !text) {
      return res.status(400).json({ error: "Chat ID and text are required" });
    }

    let conversation = await ArtificiumConversation.findOne({ chatId });
    if (!conversation) {
      conversation = new ArtificiumConversation({ chatId, messages: [] });
    }

    const userMessage = {
      text,
      temporaryId,
      image: null, // Start with null; update later with S3 URL
      sender: "user",
    };
    conversation.messages.push(userMessage);

    const botMessage = {
      text,
      image: null,
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

// Fetch conversation (unchanged)
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

// Find message by temporaryId
router.get("/findmessage/:temp", async (req, res) => {
  try {
    const { temp } = req.params;
    if (!temp) {
      return res.status(400).json({ error: "Temporary ID is required" });
    }

    const conversation = await ArtificiumConversation.findOne({
      "messages.temporaryId": temp,
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const message = conversation.messages.find((msg) => msg.temporaryId === temp);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({
      success: true,
      message: {
        _id: message._id,
        conversationId: conversation._id,
      },
    });
  } catch (error) {
    console.error("Error finding message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add image to message
router.put("/addimage/:id", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const { id } = req.params;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const conversation = await ArtificiumConversation.findOneAndUpdate(
      { "messages._id": id },
      { $set: { "messages.$.image": imageUrl } },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({
      success: true,
      message: "Image added",
      conversation,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Regenerate route (unchanged)
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