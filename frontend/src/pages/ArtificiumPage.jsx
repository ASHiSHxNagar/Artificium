import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import ChatInput from "../components/chat/ChatInput";
import Content from "../components/chat/Content";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { lookInSession } from "../components/shared/Session";

const API_BASE = import.meta.env.VITE_SERVER_DOMAIN;

export default function ArtificiumPage({ onShareClick }) {
  const workspaceSlug = lookInSession("workspaceSlug");
  const [workspace, setWorkspace] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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

  const fetchChats = async (workspaceId) => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/workspaces/${workspaceId}/allchats`
      );
      if (data.success) {
        setChats(data.chats);
        if (data.chats.length > 0 && !selectedChat) {
          setSelectedChat(data.chats[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleMessageSent = () => {
    setRefreshTrigger((prev) => prev + 1); // Trigger refresh of conversation
  };

  return (
    <div className="flex h-screen w-full bg-noble-black-700 text-gray-200">
      <Sidebar
        activeProject={workspace?.name || "No Workspace"}
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
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
            <Content
              chatId={selectedChat._id}
              onMessageSent={refreshTrigger}
            />
          ) : (
            <div className="text-white">Select a chat to start</div>
          )}
        </div>

        {selectedChat && (
          <ChatInput
            width="max-w-[calc(100vw-320px)]"
            chatId={selectedChat._id}
            onMessageSent={handleMessageSent}
          />
        )}
      </div>
    </div>
  );
}

ArtificiumPage.propTypes = {
  onShareClick: PropTypes.func,
};

ArtificiumPage.defaultProps = {
  onShareClick: null,
};