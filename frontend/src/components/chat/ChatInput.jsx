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
  className,
  chatId,
  onMessageSent,
  replyingTo,
  isArtificiumTab,
}) {
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
const API_BASE = import.meta.env.VITE_SERVER_DOMAIN;


  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, or JPEG files are allowed.");
      return;
    }

    setImageFile(file);
    toast.success("Image selected! Send your message to upload it.");
  };

  const handleSend = async () => {
    if (!message && !imageFile) {
      toast.error("Please enter a message or select an image to send.");
      return;
    }

    setIsLoading(true);
    const tempId = nanoid(10);

    try {
      const messageData = {
        chatId,
        text: message || "",
        temporaryId: tempId,
      };
      if (replyingTo && !isArtificiumTab) {
        messageData.messageId = replyingTo;
      }

      const endpoint = isArtificiumTab
        ? `${API_BASE}/artificium/send`
        : replyingTo
        ? `${API_BASE}/messages/reply`
        : `${API_BASE}/messages/send`;

      const response = await axios.post(endpoint, messageData, {
        headers: {
          "Content-Type": "application/json",
        },
      });


      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        const findEndpoint = isArtificiumTab
          ? `${API_BASE}/artificium/findmessage/${tempId}`
          : replyingTo
          ? `${API_BASE}/messages/findmessage/reply/${tempId}`
          : `${API_BASE}/messages/findmessage/send/${tempId}`;

        const findResponse = await axios.get(findEndpoint);
        let messageId;

        if (isArtificiumTab) {
          messageId = findResponse.data.message._id;
        } else {
          messageId = findResponse.data.message._id;
        }
        if (!messageId) {
          throw new Error("Message ID not found");
        }

        const updateEndpoint = isArtificiumTab
          ? `${API_BASE}/artificium/addimage/${messageId}`
          : replyingTo
          ? `${API_BASE}/messages/addimage/reply/${messageId}`
          : `${API_BASE}/messages/addimage/send/${messageId}`;

        await axios.put(
          updateEndpoint,
          { imageUrl },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      toast.success("Message sent!");
      setMessage("");
      setImageFile(null);
      if (onMessageSent) onMessageSent();
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to send message: ${
          error.response?.data?.error || error.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div
        className={`bg-noble-black-800 w-full flex items-center rounded-2xl ${className}`}
      >
        <button
          type="button"
          className="mr-5 ml-2 cursor-pointer hover:scale-105"
          disabled={isLoading}
        >
          <img
            src={micIcon}
            alt="Mic"
            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
          />
        </button>

        <input
          type="text"
          placeholder={
            replyingTo
              ? "Type your reply..."
              : "You can ask me anything! I am here to help."
          }
          className="flex-1 bg-noble-black-800 py-2 rounded-l focus:outline-none text-white placeholder:text-noble-black-400 text-[8px] sm:text-sm lg:text-base  font-semibold"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex gap-1 sm:gap-2 md:gap-3  lg:gap-5 mr-2">
          <button
            type="button"
            className=" cursor-pointer hover:scale-105"
            onClick={() => fileInputRef.current.click()}
            disabled={isLoading}
          >
            <img
              src={attachIcon}
              alt="Attach"
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
            />
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
            className=" bg-noble-black-700 p-1 lg:p-3 rounded-xl hover:bg-noble-black-600 cursor-pointer hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <img
                src={loadingIcon}
                alt="Loading"
                className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 animate-spin"
              />
            ) : (
              <img
                src={sendIcon}
                alt="Send"
                className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

ChatInput.propTypes = {
  className: PropTypes.string,
  chatId: PropTypes.string.isRequired,
  onMessageSent: PropTypes.func,
  replyingTo: PropTypes.string,
  isArtificiumTab: PropTypes.bool.isRequired,
};

ChatInput.defaultProps = {
  className: "",
  onMessageSent: null,
  replyingTo: null,
  isArtificiumTab: false,
};
