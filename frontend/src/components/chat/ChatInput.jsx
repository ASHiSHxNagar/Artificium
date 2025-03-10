import { useState, useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

// icons
import attachIcon from "../../assets/icons/attatchment.svg";
import sendIcon from "../../assets/icons/paper_plane.svg";
import micIcon from "../../assets/icons/microphone.svg";

export default function ChatInput(chat_tab_input) {
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // We'll keep a ref to the file input so we can click it programmatically
  const fileInputRef = useRef(null);

  // Only allow PNG/JPG/JPEG
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

  // Called when user clicks the paper plane icon
  const handleSend = async () => {
    if (!message && !imageFile) {
      return; // nothing to send
    }

    try {
      // We’ll send as FormData so we can include both text and file
      const formData = new FormData();
      formData.append("text", message);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Example: sending to "/api/chat/sendMessage"
      // Adjust URL & method as needed for your backend
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/chat/sendMessage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Clear input & file after successful send
      setMessage("");
      setImageFile(null);
      // Possibly handle the server’s response (e.g., new message ID)
      console.log("Message sent:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div
        className={`p-2 fixed bottom-1 w-full overflow-x-hidden ${
          chat_tab_input
            ? "max-w-[calc(100vw-630px)]"
            : "max-w-[calc(100vw-320px)]"
        }`}
      >
        <div className="bg-noble-black-800 w-full flex items-center p-6 rounded-2xl">
          {/* Microphone Icon (does nothing) */}
          <button type="button" className="mr-5 cursor-pointer hover:scale-105">
            <img src={micIcon} alt="Mic" className="w-5 h-5" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            placeholder="You can ask me anything! I am here to help."
            className="flex-1 bg-noble-black-800 px-4 py-2 rounded-l focus:outline-none mr-2  text-white placeholder:text-noble-black-400 text-base font-semibold"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Attachment Icon */}
          <button
            type="button"
            className="mr-3 cursor-pointer hover:scale-105"
            onClick={() => fileInputRef.current.click()}
          >
            <img src={attachIcon} alt="Attach" className="w-5 h-5" />
          </button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Send (paper plane) Icon */}
          <button
            type="button"
            onClick={handleSend}
            className="ml-3 bg-noble-black-700 p-3 rounded-xl hover:bg-noble-black-600 cursor-pointer hover:scale-105"
          >
            <img src={sendIcon} alt="Send" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
