// backend/routes/workspaceRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import slugify from "slugify";

// Models
import User from "../Schema/User.js";
import Workspace from "../Schema/Workspace.js";
import Chat from "../Schema/Chat.js";
import Message from "../Schema/Message.js";

// Suppose you have a helper function to generate a username
//generating username 
const generateUsername = async (email) => {
    let username = email.split("@")[0];

    let usernameExists = await User.exists({ "personal_info.username": username }).then((result) => result);
    if (usernameExists) {
        username += nanoid().substring(0, 5);
    }

    return username;
};

const router = express.Router();

/**
 * POST /api/workspaces/create
 * Body: {
 *   workspaceName: string,
 *   chatTitle: string,
 *   messageText: string
 * }
 */
router.post("/create", async (req, res) => {
    try {
        // 1) Get token from headers: "Authorization: Bearer <token>"
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, msg: "No authorization header" });
        }

        const token = authHeader.split(" ")[1]; // after "Bearer "
        if (!token) {
            return res.status(401).json({ success: false, msg: "Invalid Bearer token" });
        }

        // 2) Decode token to get userId
        // Make sure you have a JWT_SECRET in .env or config
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;
        if (!userId) {
            return res.status(401).json({ success: false, msg: "Invalid token payload" });
        }

        // 3) Find user in DB
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        // If user doesn't have a username, generate one
        if (!user.personal_info.username) {
            const newUsername = generateUsername(user.personal_info.email);
            user.personal_info.username = newUsername;
            await user.save(); // persist the updated user
        }

        // 4) Create the Workspace
        const { workspaceName, chatTitle, messageText } = req.body;

        if (!workspaceName) {
            return res.status(400).json({ success: false, msg: "workspaceName is required" });
        }

        // Generate a slug from workspaceName
        const slug = slugify(workspaceName, { lower: true, strict: true });

        // For demonstration, we store the user ID in "createdBy"
        const newWorkspace = await Workspace.create({
            name: workspaceName,
            slug,
            createdBy: user._id,  // or store user.personal_info.username
            members: [user._id],  // optionally add user to members
        });

        // 5) Create a Chat for this workspace
        if (!chatTitle) {
            return res.status(400).json({ success: false, msg: "chatTitle is required" });
        }

        const newChat = await Chat.create({
            workspace: newWorkspace._id,
            title: chatTitle,
            // If you want participants, store the user ID or username
            participants: [user._id],
        });

        // 6) Create a Message in that chat
        if (!messageText) {
            return res.status(400).json({ success: false, msg: "messageText is required" });
        }

        // We'll store two replies from the same user
        const replies = [
            {
                sender: user._id,
                text: `Reply 1: ${messageText}`,
            },
            {
                sender: user._id,
                text: `Reply 2: ${messageText}`,
            },
        ];

        const newMessage = await Message.create({
            chat: newChat._id,
            sender: user._id,
            role: "user",          // or "bot" if from Artificium
            text: messageText,
            images: [],            // no images for now
            replies,               // subdocuments
        });

        // Everything succeeded, return the created documents
        return res.json({
            success: true,
            workspace: newWorkspace,
            chat: newChat,
            message: newMessage,
        });
    } catch (err) {
        console.error("Error creating workspace/chat/message:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

export default router;
