import express from "express";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { requireAuth } from "../middleware/requireAuth.js";

// Models
import Workspace from "../Schema/Workspace.js";
import Chat from "../Schema/Chat.js";
import Message from "../Schema/Message.js";

const router = express.Router();

// GET /api/workspaces/checkByName/:name - Check if a workspace name exists
router.get("/checkByName/:name", async (req, res) => {
  try {
    const { name } = req.params;

    // Exact match (case-sensitive) since names are unique
    const workspace = await Workspace.findOne({ name });

    if (workspace) {
      // Workspace exists, throw an error to indicate it's already taken
      return res
        .status(400)
        .json({ success: false, message: "A workspace with this name already exists. Try joining it." });
    }

    // No workspace found, allow creation
    return res.json({ success: true, message: "Workspace name is available" });
  } catch (err) {
    console.error("Error checking workspace by name:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/workspaces/name/:name - Fetch workspace by name for joining

router.get("/name/:name", requireAuth, async (req, res) => {
  try {
    const { name } = req.params;

    console.log(`Checking workspace with name: ${name}`); // Debug log
    const workspace = await Workspace.findOne({ name });
    if (!workspace) {
      return res
        .status(404)
        .json({ success: false, message: "No workspace with that name" });
    }
    return res.json({
      success: true,
      workspaceId: workspace._id,
      slug: workspace.slug,
    });
  } catch (err) {
    console.error("Error fetching workspace by name:", err); // Enhanced logging
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ... (rest of the routes remain the same)
/* 
  1) CREATE WORKSPACE
     POST /api/workspaces
     Body: { workspaceName: string }
*/
// backend/routes/workspaceRoutes.js
router.post("/", requireAuth, async (req, res) => {
  try {
    const { workspaceName } = req.body;
    if (!workspaceName) {
      return res
        .status(400)
        .json({ success: false, message: "Workspace name is required" });
    }

    // Check if a workspace with this name already exists
    const existingWorkspace = await Workspace.findOne({ name: workspaceName });
    if (existingWorkspace) {
      return res
        .status(400)
        .json({ success: false, message: "A workspace with this name already exists. Try joining it." });
    }

    // Generate slug
    let slug = slugify(workspaceName, { lower: true, strict: true });

    // Check if slug is taken
    const existingSlug = await Workspace.findOne({ slug });
    if (existingSlug) {
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
    if (err.code === 11000) {
      // This should no longer trigger due to the pre-check, but kept as a fallback
      return res
        .status(400)
        .json({ success: false, message: "A workspace with this name already exists. Try joining it." });
    }
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
      return res.status(400).json({ success: false, message: "Chat title is required" });
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    const newChat = await Chat.create({
      workspace: workspace._id,
      title,
      participants: [req.user._id],
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
     Body: { text, images, replies }
*/
router.post("/:workspaceId/chats/:chatId/messages", requireAuth, async (req, res) => {
  try {
    const { workspaceId, chatId } = req.params;
    const { text, images = [], replies = [] } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: "Message text is required" });
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    const chat = await Chat.findOne({ _id: chatId, workspace: workspaceId });
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found in this workspace" });
    }

    const formattedReplies = (replies || []).map((r) => ({
      sender: req.user._id,
      text: r.text,
      images: r.images || [],
    }));

    const newMessage = await Message.create({
      chat: chat._id,
      sender: req.user._id,
      role: "user",
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

// GET /api/workspaces/:workspaceId
router.get("/:workspaceId", async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.json({ success: false, message: "Workspace not found" });
    }
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
      return res.json({ success: false, message: "Workspace not found" });
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