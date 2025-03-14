import mongoose from "mongoose";

const artificiumMessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or path to the uploaded image
  },
  temporaryId: {
    type: String,
    default: null
  },
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const artificiumConversationSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat", // References the Chat model
    required: true,
  },
  messages: [artificiumMessageSchema],
});

export default mongoose.model("ArtificiumConversation", artificiumConversationSchema);