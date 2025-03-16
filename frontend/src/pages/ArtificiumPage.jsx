import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { nanoid } from "nanoid";

// Components
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import Content from "../components/chat/Content";
import ChatInput from "../components/chat/ChatInput";
import ChatRightPanel from "../components/layout/ChatRightPanel";
import RightPanelModal from "../components/shared/RightPanelModal";

// Placeholder icon for toggle (replace with your local one)
import users_icon from "../assets/icons/users_icon.svg";

export default function ArtificiumPage({ onShareClick }) {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [channelName, setChannelName] = useState("Spaceship Crew");
  const [channelCount, setChannelCount] = useState(4);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/chat/getall`
        );
        setChats(response.data.chats);
        if (response.data.chats.length > 0 && !selectedChat) {
          setSelectedChat(response.data.chats[0]);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    const fetchWorkspace = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/workspace/getall`
        );
        if (response.data.workspaces.length > 0) {
          setWorkspace(response.data.workspaces[0]);
        }
      } catch (error) {
        console.error("Error fetching workspace:", error);
      }
    };

    fetchChats();
    fetchWorkspace();
  }, []);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setIsSidebarOpen(false);
  };

  const handleChatAdded = () => {
    const newChat = {
      _id: nanoid(),
      name: `Chat ${chats.length + 1}`,
      messages: [],
    };
    setChats([...chats, newChat]);
    setSelectedChat(newChat);
  };

  const handleMessageSent = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen w-full bg-noble-black-700 text-gray-200">
      {/* Left Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 bg-noble-black-800 transition-transform duration-300 ease-in-out z-50`}
      >
        <Sidebar
          activeProject={workspace?.name || "No Workspace"}
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
          onChatAdded={handleChatAdded}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-noble-black-600 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-16 xl:mt-0 md:pl-15 lg:pl-15 ">
        <TopNav
          activeTab="artificium"
          onShareClick={onShareClick}
          activeProject={workspace?.name || "No Workspace"}
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
        />

        <div className="flex flex-1 overflow-hidden px-1 sm:px-2 md:px-3 lg:px-5">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4 md:p-6 overflow-y-scroll">
              {selectedChat ? (
                <Content
                  chatId={selectedChat._id}
                  onMessageSent={refreshTrigger}
                />
              ) : (
                ""
              )}
            </div>
            {selectedChat && (
              <ChatInput
                className="p-2"
                chatId={selectedChat._id}
                onMessageSent={handleMessageSent}
                isArtificiumTab={true}
              />
            )}
          </div>

          {/* Right Panel (Visible from lg and up) */}
          <div className="hidden xl:block w-[300px] overflow-y-scroll">
            <ChatRightPanel
              channelName={channelName}
              setChannelName={setChannelName}
              channelCount={channelCount}
              setChannelCount={setChannelCount}
            />
          </div>
        </div>
      </div>

      {/* Toggle Button for Right Panel Modal (Visible below lg) */}
      <button
        className="xl:hidden fixed top-4 right-4 z-50 p-2 bg-noble-black-600 rounded-md"
        onClick={() => setIsRightPanelOpen(true)}
      >
        <img src={users_icon} alt="Toggle Right Panel" className="w-6 h-6" />
      </button>

      {/* Right Panel Modal (Visible below lg) */}
      <RightPanelModal
        isOpen={isRightPanelOpen}
        onClose={() => setIsRightPanelOpen(false)}
        channelName={channelName}
        setChannelName={setChannelName}
        channelCount={channelCount}
        setChannelCount={setChannelCount}
      />
    </div>
  );
}

ArtificiumPage.propTypes = {
  onShareClick: PropTypes.func.isRequired,
};
