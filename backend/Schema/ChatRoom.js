import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    // If you want to differentiate direct messages vs. group chats
    isGroup: {
      type: Boolean,
      default: false,
    },
    // If it's a group, store a name
    groupName: {
      type: String,
      required: function () {
        return this.isGroup === true;
      },
    },
    // Optionally store a group image or other metadata
    // groupImage: String,
  },
  { timestamps: true }
);

export default mongoose.model("ChatRoom", chatRoomSchema);
