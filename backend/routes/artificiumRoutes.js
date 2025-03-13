import express from "express";
import mongoose from "mongoose";
import ArtificiumConversation from "../Schema/ArtificiumConversation.js";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Fixed typo
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

// POST /api/artificium/send
router.post("/send", upload.single("image"), async (req, res) => {
    try {
        const { chatId, text } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        // Validate input
        if (!chatId || !text) {
            return res.status(400).json({ error: "Chat ID and text are required" });
        }

        // Find or create conversation for the chat
        let conversation = await ArtificiumConversation.findOne({ chatId });
        if (!conversation) {
            conversation = new ArtificiumConversation({ chatId, messages: [] });
        }

        // Add user message
        const userMessage = {
            text,
            image,
            sender: "user",
        };
        conversation.messages.push(userMessage);

        // Simulate bot response (echo the user's input for now)
        const botMessage = {
            text,
            image,
            sender: "bot",
        };
        conversation.messages.push(botMessage);

        await conversation.save(); // Ensure _id is generated for subdocuments

        // Return the full conversation with a delay to simulate loading
        setTimeout(() => {
            res.status(200).json({
                success: true,
                conversation: conversation, // Return full conversation for frontend consistency
            });
        }, 2000); // 2-second delay to show loading animation
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /api/artificium/conversation/:chatId
router.get("/conversation/:chatId", async (req, res) => {
    try {
        const { chatId } = req.params;
        const conversation = await ArtificiumConversation.findOne({ chatId });
        res.status(200).json({
            success: true,
            conversation: conversation || { messages: [] }, // Return empty messages if no conversation exists
        });
    } catch (error) {
        console.error("Error fetching conversation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /api/artificium/regenerate
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

        const message = conversation.messages.id(messageId);
        if (!message || message.sender !== "bot") {
            return res.status(404).json({ error: "Bot message not found" });
        }

        // Simulate regeneration (echo the same message for now)
        setTimeout(() => {
            res.status(200).json({
                success: true,
                message,
                conversation, // Return updated conversation
            });
        }, 2000); // 2-second delay to show loading animation
    } catch (error) {
        console.error("Error regenerating message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;