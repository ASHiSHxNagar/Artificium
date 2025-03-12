// backend/models/Workspace.js
import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    // e.g. "my-workspace" or a shortid
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Optionally store an array of members who can access this workspace
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
}, {
  timestamps: true, // createdAt, updatedAt
});

export default mongoose.model("Workspace", workspaceSchema);
