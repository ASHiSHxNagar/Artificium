import { useState, useEffect } from "react";
import axios from "axios";
import ArtificiumMessageBox from "./ArtificiumMessageBox";
import PropTypes from "prop-types";

// Concept art images (replace with your actual paths)
import conceptArt1 from "../../assets/images/concept-art1.png";
import conceptArt2 from "../../assets/images/concept-art2.png";
import conceptArt3 from "../../assets/images/concept-art3.png";

const API_BASE = import.meta.env.VITE_SERVER_DOMAIN;

export default function Content({ chatId, onMessageSent }) {
  const [conversation, setConversation] = useState(null);
  const [isRegenerating, setIsRegenerating] = useState({});

  useEffect(() => {
    fetchConversation();
  }, [chatId, onMessageSent]);

  const fetchConversation = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/artificium/conversation/${chatId}`
      );
      if (data.success) {
        setConversation(data.conversation);
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const handleRegenerate = async (messageId) => {
    setIsRegenerating((prev) => ({ ...prev, [messageId]: true }));
    try {
      const { data } = await axios.post(`${API_BASE}/artificium/regenerate`, {
        chatId,
        messageId,
      });
      if (data.success) {
        fetchConversation(); // Refresh conversation
      }
    } catch (error) {
      console.error("Error regenerating message:", error);
    } finally {
      setIsRegenerating((prev) => ({ ...prev, [messageId]: false }));
    }
  };

  // Default content if no conversation exists
  if (
    !conversation ||
    !conversation.messages ||
    conversation.messages.length === 0
  ) {
    return (
      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="bg-noble-black-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Artificium</span>
            <span className="text-xs text-gray-400">Just now</span>
          </div>
          <p className="text-white mt-2">
            Sure thing! How about these spaceship names:
          </p>
          <div className="flex gap-2 mt-4">
            <button className="bg-noble-black-700 px-3 py-1 rounded hover:bg-noble-black-600">
              Starfire
            </button>
            <button className="bg-noble-black-700 px-3 py-1 rounded hover:bg-noble-black-600">
              Celestia
            </button>
            <button className="bg-noble-black-700 px-3 py-1 rounded hover:bg-noble-black-600">
              Cosmic Voyager
            </button>
            <button className="bg-noble-black-700 px-3 py-1 rounded hover:bg-noble-black-600">
              ...
            </button>
          </div>
          <p className="text-white mt-4">
            Here are a few concept arts that also might inspire you. Take a
            look!
          </p>
          <div className="flex gap-4 mt-4">
            <img
              src={conceptArt1}
              alt="Concept Art 1"
              className="w-40 h-40 rounded"
            />
            <img
              src={conceptArt2}
              alt="Concept Art 2"
              className="w-40 h-40 rounded"
            />
            <img
              src={conceptArt3}
              alt="Concept Art 3"
              className="w-40 h-40 rounded"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button className="bg-noble-black-700 px-3 py-1 rounded hover:bg-noble-black-600">
              Regenerate response
            </button>
            <div className="relative group">
              <button className="bg-noble-black-700 px-3 py-1 rounded hover:bg-noble-black-600 flex items-center gap-2">
                Modify
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown placeholder */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display conversation if it exists
  return (
    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pb-[150px]">
      {conversation.messages.map((msg) => (
        <ArtificiumMessageBox
          key={msg._id}
          message={msg}
          isRegenerating={isRegenerating[msg._id] || false}
          onRegenerate={handleRegenerate}
        />
      ))}
    </div>
  );
}

Content.propTypes = {
  chatId: PropTypes.string.isRequired,
  onMessageSent: PropTypes.func,
};

Content.defaultProps = {
  onMessageSent: null,
};
