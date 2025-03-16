import { useState } from "react";
import PropTypes from "prop-types";

// Icons (same as ChatRightPanel)
import chevron_right_icon from "../../assets/icons/chevron-right.svg";
import chevron_down_icon from "../../assets/icons/chevron-down.svg";
import Chat_Icon from "../../assets/icons/chat_bubble_icon.svg";
import Chat_Active_Icon from "../../assets/icons/chat_bubble_active_icon.svg";
import Users_Icon from "../../assets/icons/users_icon.svg";
import Users_Inactive_Icon from "../../assets/icons/users_Inactive_icon.svg";
import globe_icon_2 from "../../assets/icons/globe_icon_2.svg";
import padlock_icon from "../../assets/icons/padlock_icon.svg";
import close_icon from "../../assets/icons/cross_icon.svg";

// Avatars (same as ChatRightPanel)
import Adam_Green from "../../assets/avatar/Adam_Green.png";
import David_Singh from "../../assets/avatar/David_Singh.png";
import Harper_Singh from "../../assets/avatar/Harper_Singh.png";
import Lily_Patel from "../../assets/avatar/Lily_Patel.png";
import Lucas_Ortiz from "../../assets/avatar/Lucas_Ortiz.png";
import Marcus_Chen from "../../assets/avatar/Marcus_Chen.png";
import Mia_Park from "../../assets/avatar/Mia_Park.png";
import Olivia_Sharma from "../../assets/avatar/Olivia_Sharma.png";
import Sophia_Zhang from "../../assets/avatar/Sophia_Zhang.png";

export default function ChatRightPanelModal({
  isOpen,
  onClose,
  channelName,
  setChannelName,
  channelCount,
  setChannelCount,
}) {
  // Same state as ChatRightPanel
  const [activeTab, setActiveTab] = useState("members");
  const [publicOpen, setPublicOpen] = useState(true);
  const [privateOpen, setPrivateOpen] = useState(false);
  const [expandedChannel, setExpandedChannel] = useState(3);

  // Same dummy data as ChatRightPanel
  const onlineUsers = [
    {
      id: 1,
      name: "Adam Green",
      status: "Exploring Library",
      avatar: Adam_Green,
      online: true,
    },
    {
      id: 2,
      name: "David Singh",
      status: "Exploring Library",
      avatar: David_Singh,
      online: true,
    },
    {
      id: 3,
      name: "Harper Singh",
      status: "Away for 20 minutes",
      avatar: Harper_Singh,
      online: true,
    },
    {
      id: 4,
      name: "Lily Patel",
      status: "Do not disturb",
      avatar: Lily_Patel,
      online: true,
    },
  ];
  const offlineUsers = [
    {
      id: 5,
      name: "Lucas Ortiz",
      status: "Last visit: 14 hr ago",
      avatar: Lucas_Ortiz,
      online: false,
    },
    {
      id: 6,
      name: "Marcus Chen",
      status: "Last visit: 14 hr ago",
      avatar: Marcus_Chen,
      online: false,
    },
    {
      id: 7,
      name: "Mia Park",
      status: "Last visit: 17 hr ago",
      avatar: Mia_Park,
      online: false,
    },
    {
      id: 8,
      name: "Olivia Sharma",
      status: "Last visit: 3 days ago",
      avatar: Olivia_Sharma,
      online: false,
    },
    {
      id: 9,
      name: "Sophia Zhang",
      status: "Last visit: 3 days ago",
      avatar: Sophia_Zhang,
      online: false,
    },
  ];
  const publicChannels = [
    { id: 1, name: "Top Secret", icon: padlock_icon },
    { id: 2, name: "Feedback", icon: globe_icon_2 },
    { id: 3, name: "Spaceship Crew", icon: globe_icon_2, onlineCount: 4 },
    { id: 4, name: "User Interface", icon: globe_icon_2 },
    { id: 5, name: "User Experience", icon: globe_icon_2 },
  ];
  const privateChannels = [
    { id: 6, name: "Private Channel 1", icon: padlock_icon },
    { id: 7, name: "Private Channel 2", icon: padlock_icon },
  ];

  const handleChannelToggle = (channelId) => {
    setExpandedChannel(expandedChannel === channelId ? null : channelId);
  };

  const handleChannelClick = (ch) => {
    setChannelName(ch.name);
    setChannelCount(ch.onlineCount || 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      {/* Modal Content */}
      <div className="w-full max-w-[300px] h-full bg-noble-black-700 flex flex-col p-4">
        {/* Close Button */}
        <button className="self-end text-white mb-4" onClick={onClose}>
          <img src={close_icon} alt="" />
        </button>

        {/* Scrollable Content (Same as ChatRightPanel) */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "members" ? (
            <>
              {/* Currently Online */}
              <div className="mb-4">
                <h3 className="flex justify-between mx-2 text-xs text-noble-black-300 mb-2 font-semibold">
                  Currently Online <span>{onlineUsers.length}</span>
                </h3>
                <div className="space-y-2">
                  {onlineUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 p-2 rounded hover:bg-noble-black-700"
                    >
                      <div className="relative cursor-pointer">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-sm"
                        />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-noble-black-800" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white cursor-pointer">
                          {user.name}
                        </span>
                        <span className="text-xs text-noble-black-300 font-semibold mt-1">
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offline */}
              <div>
                <h3 className="flex justify-between mx-2 text-xs text-noble-black-300 mb-2 font-semibold">
                  Offline <span>{offlineUsers.length}</span>
                </h3>
                <div className="space-y-2">
                  {offlineUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 p-2 rounded hover:bg-noble-black-700 opacity-50"
                    >
                      <div className="relative cursor-pointer">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-sm"
                        />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-noble-black-800" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white cursor-pointer">
                          {user.name}
                        </span>
                        <span className="text-xs text-noble-black-300 font-semibold mt-1">
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // CHATS TAB
            <div className="space-y-4">
              <div className="flex items-center gap-2 cursor-pointer pb-3 border-b border-gray-800">
                <img src={chevron_right_icon} alt="" className="w-3 h-3" />
                <span className="text-sm text-gray-300">Information</span>
              </div>

              {/* Public Channels */}
              <div className="pb-3 border-b border-gray-800">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setPublicOpen(!publicOpen)}
                >
                  <img
                    src={publicOpen ? chevron_down_icon : chevron_right_icon}
                    alt=""
                    className="w-3 h-3"
                  />
                  <span className="text-sm text-gray-300">Public Channels</span>
                </div>
                {publicOpen &&
                  publicChannels.map((ch) => (
                    <div key={ch.id} className="grid grid-cols-1 mt-3">
                      <div
                        className={`${
                          channelName === ch.name
                            ? "border-[1px] border-gray-700 rounded-xl"
                            : ""
                        }`}
                      >
                        <button
                          className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-noble-black-700"
                          onClick={() => {
                            handleChannelClick(ch);
                            handleChannelToggle(ch.id);
                          }}
                        >
                          <img src={ch.icon} alt="" className="w-4 h-4" />
                          <span className="text-base text-noble-black-400 font-semibold cursor-pointer">
                            {ch.name}
                          </span>
                          {channelName === ch.name && (
                            <div className="w-8 h-8 rounded-xl text-stem-green-600 ml-auto flex items-center justify-center bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)] backdrop-blur-sm">
                              {channelCount}
                            </div>
                          )}
                        </button>
                        {expandedChannel === ch.id && (
                          <div className="relative mb-2 mr-2 p-3">
                            <div className="absolute left-4 top-4 bottom-4 w-px h-43 bg-gray-600" />
                            <div className="flex flex-col space-y-3 pl-8">
                              {[
                                "Adam Green",
                                "David Singh",
                                "Harper Singh",
                                "Lily Patel",
                              ].map((name, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3 relative"
                                >
                                  <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-px bg-gray-500" />
                                  <div className="relative">
                                    <img
                                      src={onlineUsers[idx].avatar}
                                      alt=""
                                      className="w-10 h-10 rounded-sm"
                                    />
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-noble-black-800" />
                                  </div>
                                  <span className="text-sm text-noble-black-300 font-semibold">
                                    {name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Private Channels */}
              <div className="pb-3 border-b border-gray-800">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setPrivateOpen(!privateOpen)}
                >
                  <img
                    src={privateOpen ? chevron_down_icon : chevron_right_icon}
                    alt=""
                    className="w-3 h-3"
                  />
                  <span className="text-sm text-gray-300">
                    Private Channels
                  </span>
                </div>
                {privateOpen &&
                  privateChannels.map((ch) => (
                    <div key={ch.id} className="grid grid-cols-1 mt-3">
                      <div
                        className={`${
                          channelName === ch.name
                            ? "border-[1px] border-gray-700 rounded-xl"
                            : ""
                        }`}
                      >
                        <button
                          className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-noble-black-700"
                          onClick={() => {
                            handleChannelClick(ch);
                            handleChannelToggle(ch.id);
                          }}
                        >
                          <img src={ch.icon} alt="" className="w-4 h-4" />
                          <span className="text-base text-noble-black-400 font-semibold cursor-pointer">
                            {ch.name}
                          </span>
                          {channelName === ch.name && (
                            <div className="w-8 h-8 rounded-xl text-stem-green-600 ml-auto flex items-center justify-center bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)] backdrop-blur-sm">
                              {channelCount}
                            </div>
                          )}
                        </button>
                        {expandedChannel === ch.id && (
                          <div className="relative mb-2 mr-2 p-3">
                            <div className="absolute left-4 top-4 bottom-4 w-px h-43 bg-gray-600" />
                            <div className="flex flex-col space-y-3 pl-8">
                              {[
                                "Adam Green",
                                "David Singh",
                                "Harper Singh",
                                "Lily Patel",
                              ].map((name, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3 relative"
                                >
                                  <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-px bg-gray-500" />
                                  <div className="relative">
                                    <img
                                      src={onlineUsers[idx].avatar}
                                      alt=""
                                      className="w-10 h-10 rounded-sm"
                                    />
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-noble-black-800" />
                                  </div>
                                  <span className="text-sm text-noble-black-300 font-semibold">
                                    {name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabs at Bottom */}
        <div className="bg-noble-black-800 px-5 py-2 flex justify-around border-[1px] border-gray-800 rounded-2xl">
          <button
            className={`flex items-center justify-center text-center py-2 rounded mr-4 hover:bg-noble-black-700 ${
              activeTab === "chats"
                ? "px-6 py-1 text-white bg-noble-black-600 rounded-xl"
                : "text-gray-400 cursor-pointer"
            }`}
            onClick={() => setActiveTab("chats")}
          >
            {activeTab === "chats" ? (
              <img src={Chat_Active_Icon} alt="" className="w-6 h-6 pr-2" />
            ) : (
              <img src={Chat_Icon} alt="" className="w-6 h-6 pr-2" />
            )}
            Chats
          </button>
          <button
            className={`flex items-center justify-center text-center py-2 rounded ml-4 hover:bg-noble-black-700 ${
              activeTab === "members"
                ? "px-4 py-1 text-white bg-noble-black-600 rounded-xl"
                : "text-gray-400 cursor-pointer"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Members
            {activeTab === "members" ? (
              <img src={Users_Icon} alt="" className="w-6 h-6 pl-2" />
            ) : (
              <img src={Users_Inactive_Icon} alt="" className="w-6 h-6 pl-2" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

ChatRightPanelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  channelName: PropTypes.string.isRequired,
  setChannelName: PropTypes.func.isRequired,
  channelCount: PropTypes.number.isRequired,
  setChannelCount: PropTypes.func.isRequired,
};
