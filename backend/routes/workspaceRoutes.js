// backend/routes/workspaceRoutes.js
import express from "express";
import slugify from "slugify";
import { nanoid } from "nanoid";  // import nanoid
import { requireAuth } from "../middleware/requireAuth.js";

// Models
import Workspace from "../Schema/Workspace.js";
import Chat from "../Schema/Chat.js";
import Message from "../Schema/Message.js";

const router = express.Router();

// GET /api/workspaces/checkByName/:name - Check if a workspace name is exists in db or not 
router.get("/checkByName/:name", async (req, res) => {
    try {
        const { name } = req.params;

        //   Option A: EXACT match (case-sensitive)
        const workspace = await Workspace.findOne({ name });

        // Option B: Case-insensitive match
        //   const workspace = await Workspace.findOne({ 
        //     name: new RegExp(`^${name}$`, "i") // ^ and $ ensure full match
        //   });

        if (!workspace) {
            // No workspace with that name
            return res.json({ success: false });
        }

        // If workspace found but no slug, generate one
        if (!workspace.slug) {
            let newSlug = slugify(workspace.name, { lower: true, strict: true });

            // Check if that slug is taken
            const existing = await Workspace.findOne({ slug: newSlug });
            if (existing) {
                newSlug += "-" + nanoid(5);
            }

            workspace.slug = newSlug;
            await workspace.save();
        }

        // Return success with workspaceId + slug
        return res.json({
            success: true,
            workspaceId: workspace._id,
            slug: workspace.slug,
        });
    } catch (err) {
        console.error("Error checking workspace by name:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

/* 
  1) CREATE WORKSPACE
     POST /api/workspaces
     Body: { workspaceName: string }
*/
router.post("/", requireAuth, async (req, res) => {
    try {
        const { workspaceName } = req.body;
        console.log(workspaceName);
        if (!workspaceName) {
            return res.status(400).json({ success: false, msg: "workspaceName is required" });
        }

        // Generate slug
        let slug = slugify(workspaceName, { lower: true, strict: true });

        // Check if slug is taken
        const existing = await Workspace.findOne({ slug });
        if (existing) {
            // Append a 5-char random suffix
            slug += "-" + nanoid(5);
        }

        // Create the workspace
        const newWorkspace = await Workspace.create({
            name: workspaceName,
            slug,
            createdBy: req.user._id,
            members: [req.user._id],
        });

        return res.json({ success: true, workspace: newWorkspace });
    } catch (err) {
        console.error("Error creating workspace:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});


/*
  2) CREATE CHAT (CHANNEL) FOR A WORKSPACE
     POST /api/workspaces/:workspaceId/chats
     Body: { title: string }
*/
router.post("/:workspaceId/chats", requireAuth, async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ success: false, msg: "Chat title is required" });
        }

        // Ensure workspace exists
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ success: false, msg: "Workspace not found" });
        }

        // Create chat
        const newChat = await Chat.create({
            workspace: workspace._id,
            title,
            participants: [req.user._id], // add user as participant
        });

        return res.json({ success: true, chat: newChat });
    } catch (err) {
        console.error("Error creating chat:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

/*
  3) CREATE MESSAGE FOR A CHAT
     POST /api/workspaces/:workspaceId/chats/:chatId/messages
     Body: {
       text: string,
       images?: string[],
       replies?: [
         { text: string, images?: string[] }
       ]
     }
*/
router.post("/:workspaceId/chats/:chatId/messages", requireAuth, async (req, res) => {
    try {
        const { workspaceId, chatId } = req.params;
        const { text, images = [], replies = [] } = req.body;

        if (!text) {
            return res.status(400).json({ success: false, msg: "Message text is required" });
        }

        // Validate workspace
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ success: false, msg: "Workspace not found" });
        }

        // Validate chat
        const chat = await Chat.findOne({ _id: chatId, workspace: workspaceId });
        if (!chat) {
            return res.status(404).json({ success: false, msg: "Chat not found in this workspace" });
        }

        // Construct subdocument replies if needed if there is no replies the formattedReplies will be an empty array
        const formattedReplies = (replies || []).map((r) => ({
            sender: req.user._id,
            text: r.text,
            images: r.images || [],
        }));


        // Create message
        const newMessage = await Message.create({
            chat: chat._id,
            sender: req.user._id,
            role: "user",  // or "bot" if from AI
            text,
            images,
            replies: formattedReplies,
        });

        return res.json({ success: true, message: newMessage });
    } catch (err) {
        console.error("Error creating message:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

// backend/routes/workspaceRoutes.js to get workspace from its id 
router.get("/:workspaceId", async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.json({ success: false, msg: "Workspace not found" });
        }
        // Return workspace
        return res.json({ success: true, workspace });
    } catch (err) {
        console.error("Error getting workspace:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/workspaces/slug/:slug
router.get("/slug/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const workspace = await Workspace.findOne({ slug });
        if (!workspace) {
            return res.json({ success: false, msg: "Workspace not found" });
        }
        return res.json({ success: true, workspace });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/workspaces/:workspaceId/allchats
router.get("/:workspaceId/allchats", async (req, res) => {
    try {
        const { workspaceId } = req.params;
        // find all Chat docs with workspace = workspaceId
        const chats = await Chat.find({ workspace: workspaceId });
        return res.json({ success: true, chats });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/workspaces/chats/:chatId/messages
router.get("/chats/:chatId/messages", async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "name avatar")
            .populate({
                path: "replies.sender",
                select: "name avatar",
            });
        return res.json({ success: true, messages });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});


export default router;
