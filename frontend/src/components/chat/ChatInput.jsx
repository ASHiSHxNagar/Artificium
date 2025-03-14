import { useState, useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import PropTypes from "prop-types";

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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (allowedTypes.includes(file.type)) {
        setImageFile(file);
      } else {
        toast.error("Only PNG, JPG, or JPEG files are allowed.");
      }
    }
  };

  const handleSend = async () => {
    if (!message && !imageFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("chatId", chatId);
    formData.append("text", message);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    if (replyingTo && !isArtificiumTab) {
      formData.append("messageId", replyingTo);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      let endpoint;
      if (isArtificiumTab) {
        endpoint = `${import.meta.env.VITE_SERVER_DOMAIN}/artificium/send`;
      } else {
        endpoint = replyingTo
          ? `${import.meta.env.VITE_SERVER_DOMAIN}/messages/reply`
          : `${import.meta.env.VITE_SERVER_DOMAIN}/messages/send`;
      }

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Message sent!");
      setMessage("");
      setImageFile(null);
      if (onMessageSent) onMessageSent();
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.response) {
        toast.error(`Failed to send message: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error("Failed to send message: No response from server");
      } else {
        toast.error(`Failed to send message: ${error.message}`);
      }
   Thiết

      setIsLoading(false);
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
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
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