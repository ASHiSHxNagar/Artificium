import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import ChatInput from "../components/chat/ChatInput";
import MessageBox from "../components/chat/MessageBox";
import ChatRightPanel from "../components/layout/ChatRightPanel";
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
  const [replyingTo, setReplyingTo] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspace(workspaceId);
    }
  }, [workspaceId]);

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId);
      const chat = chats.find((c) => c._id === chatId);
      setSelectedChat(chat || null);
      setChannelName(chat?.title || "Spaceship Crew");
      setChannelCount(chat?.participants?.length || 4);
    }
  }, [chatId, chats, refreshTrigger]);

  const fetchWorkspace = async (id) => {
    try {
      const { data } = await axios.get(`${API_BASE}/workspaces/${id}`);
      if (data.success) {
        setWorkspace(data.workspace);
        fetchChats(id);
      }
    } catch (err) {
      console.error("Error fetching workspace:", err);
    }
  };

  const fetchChats = async (id) => {
    try {
      const { data } = await axios.get(`${API_BASE}/workspaces/${id}/allchats`);
      if (data.success) {
        setChats(data.chats);
        if (chatId) {
          const chat = data.chats.find((c) => c._id === chatId);
          setSelectedChat(chat || null);
        } else if (data.chats.length > 0) {
          setSelectedChat(data.chats[0]);
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
        `${API_BASE}/messages/chats/${chatId}/messages`
      );
      if (data.success) {
        const formattedMessages = [];
        data.messages.forEach((msg) => {
          formattedMessages.push({
            id: msg._id,
            avatar: msg.sender?.personal_info?.profile_img || "",
            user: msg.sender?.personal_info?.username || "Unknown User",
            date: new Date(msg.createdAt).toLocaleString(),
            text: msg.text,
            images: msg.images || [],
            isMain: true,
            createdAt: msg.createdAt,
            replies:
              msg.replies?.map((reply, index) => ({
                id: `${msg._id}-reply-${index}`,
                avatar: reply.sender?.personal_info?.profile_img || "",
                user: reply.sender?.personal_info?.username || "Unknown User",
                timeAgo: calculateTimeAgo(new Date(reply.createdAt)),
                text: reply.text,
                images: reply.images || [], // Include images in replies
                isMain: false,
                createdAt: reply.createdAt,
              })) || [],
          });
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

  const handleChatAdded = () => {
    if (workspaceId) {
      fetchChats(workspaceId);
    }
  };

  const handleReplyClick = (messageId) => {
    setReplyingTo(messageId);
  };

  const handleMessageSent = () => {
    setReplyingTo(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen bg-noble-black-700 text-gray-200">
      <Sidebar
        activeProject={workspace?.name || "Orbital Odyssey"}
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
        onChatAdded={handleChatAdded}
      />
      <div className="flex-1 flex flex-col min-w-[calc(100vw-620px)]">
        <TopNav
          activeTab="chat"
          onShareClick={onShareClick}
          activeProject={channelName}
          channelCount={channelCount}
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
        />
        <div className="p-6 flex-1 max-h-[calc(100vh-300px)] overflow-y-scroll">
          {messages.length === 0 ? (
            <MessageBox
              key="no-messages"
              message={{
                id: "no-messages",
                avatar: artificium,
                user: "Artificium",
                date: new Date().toLocaleString(),
                text: "No messages here",
                isMain: true,
              }}
              nextMessage={null}
              onReplyClick={handleReplyClick}
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
                  onReplyClick={handleReplyClick}
                />
              );
            })
          )}
        </div>
        {selectedChat && (
          <ChatInput
            width="max-w-[calc(100vw-620px)]"
            chatId={selectedChat._id}
            onMessageSent={handleMessageSent}
            replyingTo={replyingTo}
            isArtificiumTab={false} // Pass prop to indicate this is Chat tab
          />
        )}

        <div className="max-w-[300px] absolute right-0 top-0 max-h-screen overflow-y-scroll">
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
