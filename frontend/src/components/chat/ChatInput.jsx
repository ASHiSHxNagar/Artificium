import { useState, useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import PropTypes from "prop-types";
import { uploadImage } from "../shared/Aws";
import { nanoid } from "nanoid";

// Icons
import attachIcon from "../../assets/icons/attatchment.svg";
import sendIcon from "../../assets/icons/paper_plane.svg";
import micIcon from "../../assets/icons/microphone.svg";
import loadingIcon from "../../assets/icons/bouncing-circles.svg";

export default function ChatInput({
  width,
  chatId,
  onMessageSent,
  replyingTo,
  isArtificiumTab,
}) {
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, or JPEG files are allowed.");
      return;
    }

    setImageFile(file); // Store the file for later upload
    toast.success("Image selected! Send your message to upload it.");
  };

  const handleSend = async () => {
    if (!message && !imageFile) return;

    setIsLoading(true);
    const tempId = nanoid(10); // Generate tempId here

    try {
      // Step 1: Send the message with tempId as JSON
      const messageData = {
        chatId,
        text: message,
        temporaryId: tempId,
      };
      if (replyingTo && !isArtificiumTab) {
        messageData.messageId = replyingTo;
      }

      const endpoint = isArtificiumTab
        ? `${import.meta.env.VITE_SERVER_DOMAIN}/artificium/send`
        : replyingTo
        ? `${import.meta.env.VITE_SERVER_DOMAIN}/messages/reply`
        : `${import.meta.env.VITE_SERVER_DOMAIN}/messages/send`;

      const response = await axios.post(endpoint, messageData, {
        headers: {
          "Content-Type": "application/json", // Explicitly set JSON content type
        },
      });

      console.log("Send response:", response.data); // Debug the response

      // Step 2: If there's an image, upload it and update the message
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        const findEndpoint = isArtificiumTab
          ? `${import.meta.env.VITE_SERVER_DOMAIN}/artificium/findmessage/${tempId}`
          : `${import.meta.env.VITE_SERVER_DOMAIN}/messages/findmessage/${tempId}`;

        const findResponse = await axios.get(findEndpoint);
        let messageId;

        if (isArtificiumTab) {
          messageId = findResponse.data.message._id; // Artificium message ID
        } else {
          messageId = findResponse.data.message._id; // Message ID
        }

        if (!messageId) {
          throw new Error("Message ID not found");
        }

        const updateEndpoint = isArtificiumTab
          ? `${import.meta.env.VITE_SERVER_DOMAIN}/artificium/addimage/${messageId}`
          : `${import.meta.env.VITE_SERVER_DOMAIN}/messages/addimage/${messageId}`;

        await axios.put(updateEndpoint, { imageUrl }, {
          headers: { "Content-Type": "application/json" },
        });
      }

      toast.success("Message sent!");
      setMessage("");
      setImageFile(null);
      if (onMessageSent) onMessageSent(); // Trigger refetch
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
      toast.error(`Failed to send message: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div
        className={`p-2 fixed bottom-1 w-full overflow-x-hidden pb-5 ${width}`}
      >
        <div className="bg-noble-black-800 w-full flex items-center p-6 rounded-2xl">
          <button
            type="button"
            className="mr-5 cursor-pointer hover:scale-105"
            disabled={isLoading}
          >
            <img src={micIcon} alt="Mic" className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder={
              replyingTo
                ? "Type your reply..."
                : "You can ask me anything! I am here to help."
            }
            className="flex-1 bg-noble-black-800 px-4 py-2 rounded-l focus:outline-none mr-2 text-white placeholder:text-noble-black-400 text-base font-semibold"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />

          <button
            type="button"
            className="mr-3 cursor-pointer hover:scale-105"
            onClick={() => fileInputRef.current.click()}
            disabled={isLoading}
          >
            <img src={attachIcon} alt="Attach" className="w-5 h-5" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isLoading}
          />

          <button
            type="button"
            onClick={handleSend}
            className="ml-3 bg-noble-black-700 p-3 rounded-xl hover:bg-noble-black-600 cursor-pointer hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <img
                src={loadingIcon}
                alt="Loading"
                className="w-5 h-5 animate-spin"
              />
            ) : (
              <img src={sendIcon} alt="Send" className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

ChatInput.propTypes = {
  width: PropTypes.string,
  chatId: PropTypes.string.isRequired,
  onMessageSent: PropTypes.func,
  replyingTo: PropTypes.string,
  isArtificiumTab: PropTypes.bool.isRequired,
};

ChatInput.defaultProps = {
  width: "max-w-[calc(100vw-320px)]",
  onMessageSent: null,
  replyingTo: null,
  isArtificiumTab: false,
};