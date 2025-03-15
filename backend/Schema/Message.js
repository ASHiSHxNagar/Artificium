import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  temporaryId: {
    type: String,
    default: null
  },
  text: {
    type: String,
  },
  images: [
    {
      type: String, // Path to the image
    },
  ],
  sender: {
    type: String,
    required: true,
  },
  replies: [
    {
      text: {
        type: String,
      },
      temporaryId: {
        type: String,
        default: null
      },

      images: [
        {
          type: String, // Path to the image
        },
      ],
      sender: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", MessageSchema);