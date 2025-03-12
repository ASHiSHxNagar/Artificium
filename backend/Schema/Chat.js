// backend/models/Chat.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // If you want to store participants or something similar
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
}, {
  timestamps: true,
});

export default mongoose.model("Chat", chatSchema);
