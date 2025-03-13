import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import ChatRightPanel from "../components/layout/ChatRightPanel";
import ChatInput from "../components/chat/ChatInput";
import MessageBox from "../components/chat/MessageBox";
import PropTypes from "prop-types";

// Icons
import star_icon from "../assets/icons/star_icon.svg";
import dots_icon from "../assets/icons/dots_icon.svg";
import artificium from "../assets/avatar/Artificium.png";

const API_BASE = import.meta.env.VITE_SERVER_DOMAIN;

export default function ChatPage({ onShareClick }) {
  const { workspaceId, chatId } = useParams();
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState("Spaceship Crew");
  const [channelCount, setChannelCount] = useState(4);
  const [messages, setMessages] = useState([]);
  const [workspace, setWorkspace] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspace();
      fetchChats();
    }
  }, [workspaceId]);

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId);
      const selected = chats.find((chat) => chat._id === chatId);
      if (selected) {
        setSelectedChat(selected);
        setChannelName(selected.title);
        setChannelCount(selected.participants?.length || 4);
      }
    }
  }, [chatId, chats]);

  const fetchWorkspace = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/workspaces/${workspaceId}`);
      if (data.success && data.workspace) {
        setWorkspace(data.workspace);
        sessionStorage.setItem("workspaceId", data.workspace._id);
      } else {
        console.log("Workspace not found or error");
      }
    } catch (err) {
      console.error("Error fetching workspace:", err);
    }
  };

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/workspaces/${workspaceId}/allchats`
      );
      if (data.success) {
        setChats(data.chats);
        if (!chatId && data.chats.length > 0) {
          navigate(
            `/artificium/workspace/${workspaceId}/allchats/${data.chats[0]._id}`
          );
        }
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/workspaces/chats/${chatId}/messages`
      );
      if (data.success) {
        const formattedMessages = [];
        data.messages.forEach((msg) => {
          // Main message
          formattedMessages.push({
            id: msg._id,
            avatar: msg.sender?.personal_info?.profile_img || "", // Use User schema profile_img
            user: msg.sender?.personal_info?.username || "Unknown User",
            date: new Date(msg.createdAt).toLocaleString(),
            text: msg.text,
            isMain: true,
            createdAt: msg.createdAt, // Add createdAt for divider logic
          });

          // Replies (subdocuments)
          if (msg.replies && msg.replies.length > 0) {
            msg.replies.forEach((reply, index) => {
              formattedMessages.push({
                id: `${msg._id}-reply-${index}`,
                avatar: reply.sender?.personal_info?.profile_img || "",
                user: reply.sender?.personal_info?.username || "Unknown User",
                timeAgo: calculateTimeAgo(new Date(reply.createdAt)),
                text: reply.text,
                isMain: false,
                createdAt: reply.createdAt, // Add createdAt for divider logic
              });
            });
          }
        });

        const messagesWithDividers = addDateDividers(formattedMessages);
        setMessages(messagesWithDividers);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const calculateTimeAgo = (date) => {
    if (!date) return "Just now";
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const addDateDividers = (msgs) => {
    const result = [];
    let lastDate = null;

    msgs.forEach((msg, index) => {
      const msgDate = msg.createdAt
        ? new Date(msg.createdAt).toDateString()
        : new Date().toDateString();
      if (lastDate !== msgDate) {
        if (index !== 0) {
          result.push({
            id: `divider-${index}`,
            divider: msgDate === new Date().toDateString() ? "Today" : msgDate,
          });
        }
        lastDate = msgDate;
      }
      result.push(msg);
    });

    return result;
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    navigate(`/artificium/workspace/${workspaceId}/allchats/${chat._id}`);
  };

  return (
    <div className="flex h-screen bg-noble-black-700 text-gray-200">
      <Sidebar
        activeProject={workspace?.name || "Orbital Odyssey"}
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
      />

      <div className="flex-1 flex flex-col">
        <TopNav
          activeTab="chat"
          onShareClick={onShareClick}
          activeProject={workspace?.name || "Orbital Odyssey"}
        />

        <div className="flex flex-1 overflow-hidden">
          <div className="pb-[150px] flex-1 flex flex-col bg-noble-black-700 p-4 overflow-y-auto">
            <div className="flex items-center gap-3 justify-between w-full mb-8">
              <h2 className="flex items-center justify-center gap-5 text-xl font-semibold text-white">
                {channelName}
                <div
                  className="
                    w-8 h-8 rounded-xl text-stem-green-600
                    flex items-center justify-center
                    bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                    backdrop-blur-sm
                  "
                >
                  {channelCount}
                </div>
              </h2>
              <div className="flex gap-2 ml-auto">
                <button className="text-gray-400 hover:text-white mr-12">
                  <img src={star_icon} alt="Star" />
                </button>
                <button className="text-gray-400 hover:text-white mr-6">
                  <img src={dots_icon} alt="More" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {messages.length === 0 ? (
                <MessageBox
                  key="no-messages"
                  message={{
                    id: "no-messages",
                    avatar: artificium, // Replace with your local Artificium avatar path
                    user: "Artificium",
                    date: new Date().toLocaleString(),
                    text: "No messages here",
                    isMain: true,
                  }}
                  nextMessage={null}
                />
              ) : (
                messages.map((msg, index) => {
                  if (msg.divider) {
                    return (
                      <div
                        key={msg.id}
                        className="text-center text-sm text-gray-500"
                      >
                        {msg.divider}
                      </div>
                    );
                  }
                  const nextMessage = messages[index + 1];
                  return (
                    <MessageBox
                      key={msg.id}
                      message={msg}
                      nextMessage={nextMessage}
                    />
                  );
                })
              )}
            </div>

            <ChatInput width="max-w-[calc(100vw-660px)]" />
          </div>

          <ChatRightPanel
            channelName={channelName}
            setChannelName={setChannelName}
            channelCount={channelCount}
            setChannelCount={setChannelCount}
          />
        </div>
      </div>
    </div>
  );
}

ChatPage.propTypes = {
  onShareClick: PropTypes.func,
};

ChatPage.defaultProps = {
  onShareClick: null,
};
