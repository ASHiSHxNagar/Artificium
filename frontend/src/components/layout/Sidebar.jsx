import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { lookInSession } from "../shared/Session";

// Avatars
import Intellisys from "../../assets/avatar/Intellisys.png";
import Ryan_Lee from "../../assets/avatar/Ryan_Lee.png";
// Icons
import arrow_down from "../../assets/icons/arrow_down.svg";
import search from "../../assets/icons/search.svg";
import credit_card from "../../assets/icons/credit_card.svg";
import plus_circle from "../../assets/icons/plus_circle.svg";
import setting from "../../assets/icons/setting.svg";
// Components
import ChatChannel from "../shared/ChatChannel";

const API_BASE = import.meta.env.VITE_SERVER_DOMAIN;

export default function Sidebar({ activeProject, chats, selectedChat, onSelectChat }) {
  const navigate = useNavigate();
  const workspaceSlug = lookInSession("workspaceSlug");
  const [workspace, setWorkspace] = useState(null);
  const [localChats, setLocalChats] = useState(chats || []);

  useEffect(() => {
    if (workspaceSlug) {
      fetchWorkspaceBySlug(workspaceSlug);
    }
  }, [workspaceSlug]);

  useEffect(() => {
    setLocalChats(chats);
  }, [chats]);

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
      const { data } = await axios.get(`${API_BASE}/workspaces/${workspaceId}/allchats`);
      if (data.success) {
        setLocalChats(data.chats);
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  const handleChatClick = (chat) => {
    onSelectChat(chat);
    const workspaceId = sessionStorage.getItem("workspaceId");
    if (workspaceId) {
      navigate(`/artificium/workspace/${workspaceId}/allchats/${chat._id}`);
    } else {
      console.error("Workspace ID not found for navigation");
    }
  };

  return (
    <div className="bg-noble-black-700 flex flex-col h-screen w-[312px] p-2">
      {/* ========== Top Section (Org Header) ========== */}
      <div className="bg-noble-black-800 p-8 mb-[1px] rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={Intellisys} alt="Intellisys Avatar" className="w-10 h-10" />
          <div className="flex flex-col">
            <h2 className="text-base font-semibold text-white">Intellisys</h2>
            <p className="text-stem-green-500 text-xs">12 members</p>
          </div>
        </div>
        <img
          src={arrow_down}
          alt="arrow_down"
          className="w-2 h-2 text-noble-black-400 cursor-pointer"
        />
      </div>

      {/* ========== General Section ========== */}
      <div className="bg-noble-black-800 px-8 py-4 mb-[1px]">
        <h3 className="text-noble-black-400 text-xs uppercase mb-3 font-semibold">
          General
        </h3>
        <div className="flex items-center gap-2 mb-3 cursor-pointer hover:text-white">
          <img src={search} alt="Search" className="w-5 h-5" />
          <span className="text-sm text-noble-black-100 font-semibold ml-2 -mt-[3px]">
            Search
          </span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <img src={credit_card} alt="Billing" className="w-5 h-5" />
          <span className="text-sm text-noble-black-100 font-semibold ml-2 -mt-[3px]">
            Billing
          </span>
        </div>
      </div>

      {/* ========== Projects (Scrollable) ========== */}
      <div className="bg-noble-black-800 flex-1 overflow-y-auto px-8 py-4">
        <h3 className="text-noble-black-400 text-xs uppercase mb-3 font-semibold">
          Projects
        </h3>
        {(localChats || []).map((chat) => (
          <ChatChannel
            key={chat._id}
            chats={[chat]}
            selectedChat={selectedChat}
            onSelectChat={handleChatClick}
          />
        ))}
        <div className="flex items-center gap-2 mt-4 cursor-pointer text-gray-400 hover:text-white onHover py-2 px-2 -ml-[2px]">
          <img src={plus_circle} alt="Add Icon" className="w-5 h-5" />
          <span className="text-sm font-semibold ml-2">Add new project</span>
        </div>
      </div>

      {/* ========== Footer (User Profile) ========== */}
      <div className="bg-noble-black-800 rounded-b-2xl p-2">
        <div
          className="flex items-center gap-3 bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)] backdrop-blur-sm px-8 py-4 rounded-md"
        >
          <div className="relative w-10 h-10">
            <img src={Ryan_Lee} alt="Ryan Lee" className="w-full h-full" />
            <div
              className="absolute top-1 right-2 w-2 h-2 bg-[#4ac97e] rounded-full transform translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_12px_#4AC97E7A]"
            ></div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white text-base">Ryan Lee</p>
            <p className="text-stem-green-500 text-xs font-medium mt-1">Premium</p>
          </div>
          <img src={setting} alt="Settings" className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  activeProject: PropTypes.string,
  chats: PropTypes.array,
  selectedChat: PropTypes.object,
  onSelectChat: PropTypes.func,
};

Sidebar.defaultProps = {
  activeProject: "",
  chats: [],
  selectedChat: null,
  onSelectChat: () => {},
};