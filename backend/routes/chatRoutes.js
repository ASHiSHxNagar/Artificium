import express from "express";
import mongoose from "mongoose";
import Chat from "../Schema/Chat.js";

const router = express.Router();

// POST /artificiumconversation/:workspaceId/chats
router.post("/:workspaceId/chats", async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const { title, participants } = req.body;

        // Validate input
        if (!title) {
            return res.status(400).json({ error: "Chat title is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
            return res.status(400).json({ error: "Invalid workspace ID" });
        }

        // Create new chat
        const newChat = new Chat({
            workspace: workspaceId,
            title,
            participants: participants || [],
        });

        await newChat.save();

        res.status(201).json({
            success: true,
            chat: newChat,
        });
    } catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;