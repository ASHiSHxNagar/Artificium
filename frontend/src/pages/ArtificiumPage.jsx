import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import ChatInput from "../components/chat/ChatInput";
import Content from "../components/chat/Content";
import PropTypes from "prop-types";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { lookInSession } from "../components/shared/Session";

const API_BASE = import.meta.env.VITE_SERVER_DOMAIN;

export default function ArtificiumPage({ onShareClick }) {
  const workspaceSlug = lookInSession("workspaceSlug"); // e.g. "vertexia"
  const [workspace, setWorkspace] = useState(null); // store the workspace doc
  const [chats, setChats] = useState([]); // store array of chats
  const [selectedChat, setSelectedChat] = useState(null); // which chat is active?

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
        sessionStorage.setItem("workspaceId", data.workspace._id); // Store workspaceId
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
      // e.g. GET /api/workspaces/:workspaceId/allchats
      // returns { success: true, chats: [...] }
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

  // Called when user clicks on a chat in the sidebar
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-screen w-full bg-noble-black-700 text-gray-200">
      {/* Left Sidebar */}
      <Sidebar
        activeProject={workspace?.name || "No Workspace"}
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNav
          activeTab="artificium"
          onShareClick={onShareClick}
          activeProject={workspace?.name || "No Workspace"}
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
        />

        {/* Page Content */}
        <div className="p-6 flex-1">
          {/* Example 4-column layout */}
          <Content />
        </div>

        {/* Bottom Input Bar (like a prompt area) */}
        {/* Pass a different width here */}
        <ChatInput width="max-w-[calc(100vw-320px)]" />
      </div>
    </div>
  );
}

ArtificiumPage.propTypes = {
  /** Optional click handler for "Share" button */
  onShareClick: PropTypes.func,
};

ArtificiumPage.defaultProps = {
  onShareClick: null,
};
