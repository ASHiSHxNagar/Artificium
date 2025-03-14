import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import ChatInput from "../components/chat/ChatInput";
import Content from "../components/chat/Content";
import PropTypes from "prop-types";

const API_BASE = import.meta.env.VITE_SERVER_DOMAIN;

export default function ArtificiumPage({ onShareClick }) {
  const { workspaceSlug, chatId } = useParams(); // Grab workspaceSlug and chatId from URL
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch workspace by slug
  useEffect(() => {
    if (workspaceSlug) {
      fetchWorkspaceBySlug(workspaceSlug);
    }
  }, [workspaceSlug]);

  const fetchWorkspaceBySlug = async (slug) => {
    try {
      const { data } = await axios.get(`${API_BASE}/workspaces/slug/${slug}`);
      if (data.success && data.workspace) {
        setWorkspace(data.workspace);
        sessionStorage.setItem("workspaceId", data.workspace._id);
        fetchChats(data.workspace._id);
      } else {
        console.log("Workspace not found or error");
      }
    } catch (err) {
      console.error("Error fetching workspace by slug:", err);
    }
  };

  // Fetch chats for the workspace
  const fetchChats = async (workspaceId) => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/workspaces/${workspaceId}/allchats`
      );
      if (data.success) {
        setChats(data.chats);
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  // Set selectedChat based on chatId from URL or default to first chat
  useEffect(() => {
    if (chats.length > 0) {
      if (chatId) {
        const chat = chats.find((c) => c._id === chatId);
        if (chat) {
          setSelectedChat(chat);
        } else {
          // If chatId is invalid, default to first chat and update URL
          setSelectedChat(chats[0]);
          navigate(`/artificium/${workspaceSlug}/${chats[0]._id}`);
        }
      } else {
        // If no chatId, select first chat and update URL
        setSelectedChat(chats[0]);
        navigate(`/artificium/${workspaceSlug}/${chats[0]._id}`);
      }
    }
  }, [chats, chatId, navigate, workspaceSlug]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    navigate(`/artificium/${workspaceSlug}/${chat._id}`);
  };

  const handleMessageSent = () => {
    setRefreshTrigger((prev) => prev + 1); // Trigger refresh of conversation
  };

  const handleChatAdded = () => {
    const workspaceId = sessionStorage.getItem("workspaceId");
    if (workspaceId) {
      fetchChats(workspaceId);
    }
  };

  return (
    <div className="flex h-screen w-full bg-noble-black-700 text-gray-200">
      <Sidebar
        activeProject={workspace?.name || "No Workspace"}
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
        onChatAdded={handleChatAdded}
      />

      <div className="flex-1 flex flex-col">
        <TopNav
          activeTab="artificium"
          onShareClick={onShareClick}
          activeProject={workspace?.name || "No Workspace"}
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
        />

        <div className="p-6 flex-1">
          {selectedChat ? (
            <Content chatId={selectedChat._id} onMessageSent={refreshTrigger} />
          ) : (
            ""
          )}
        </div>

        {selectedChat && (
          <ChatInput
            width="max-w-[calc(100vw-320px)]"
            chatId={selectedChat._id}
            onMessageSent={handleMessageSent}
            isArtificiumTab={true}
          />
        )}
      </div>
    </div>
  );
}

ArtificiumPage.propTypes = {
  onShareClick: PropTypes.func,
};
