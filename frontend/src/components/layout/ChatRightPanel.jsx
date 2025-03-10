import { useState } from "react";
import PropTypes from "prop-types";

//icons
import chevron_right_icon from "../../assets/icons/chevron-right.svg";
import chevron_down_icon from "../../assets/icons/chevron-down.svg";

//avatars
import Adam_Green from "../../assets/avatar/Adam_Green.png";
import David_Singh from "../../assets/avatar/David_Singh.png";
import Harper_Singh from "../../assets/avatar/Harper_Singh.png";
import Lily_Patel from "../../assets/avatar/Lily_Patel.png";
import Lucas_Ortiz from "../../assets/avatar/Lucas_Ortiz.png";
import Marcus_Chen from "../../assets/avatar/Marcus_Chen.png";
import Mia_Park from "../../assets/avatar/Mia_Park.png";
import Olivia_Sharma from "../../assets/avatar/Olivia_Sharma.png";
import Sophia_Zhang from "../../assets/avatar/Sophia_Zhang.png";

export default function ChatRightPanel({
  channelName,
  setChannelName,
  // channelCount,
  setChannelCount,
}) {
  // Which tab is active? "chats" or "members"
  const [activeTab, setActiveTab] = useState("members");

  // For toggling the public/private channel lists
  const [publicOpen, setPublicOpen] = useState(true);
  const [privateOpen, setPrivateOpen] = useState(false);

  // Dummy data for members
  const onlineUsers = [
    {
      id: 1,
      name: "Adam Green",
      status: "Exploring Library",
      avatar: `${Adam_Green}`,
      online: true,
    },
    {
      id: 2,
      name: "David Singh",
      status: "Exploring Library",
      avatar: `${David_Singh}`,
      online: true,
    },
    {
      id: 3,
      name: "Harper Singh",
      status: "Away for 20 minutes",
      avatar: `${Harper_Singh}`,
      online: true,
    },
    {
      id: 4,
      name: "Lily Patel",
      status: "Do not disturb",
      avatar: `${Lily_Patel}`,
      online: true,
    },
  ];
  const offlineUsers = [
    {
      id: 5,
      name: "Lucas Ortiz",
      status: "Last visit: 14 hr ago",
      avatar: `${Lucas_Ortiz}`,
      online: false,
    },
    {
      id: 6,
      name: "Marcus Chen",
      status: "Last visit: 14 hr ago",
      avatar: `${Marcus_Chen}`,
      online: false,
    },
    {
      id: 7,
      name: "Mia Park",
      status: "Last visit: 17 hr ago",
      avatar: `${Mia_Park}`,
      online: false,
    },
    {
      id: 8,
      name: "Olivia Sharma",
      status: "Last visit: 3 days ago",
      avatar: `${Olivia_Sharma}`,
      online: false,
    },
    {
      id: 9,
      name: "Sophia Zhang",
      status: "Last visit: 3 days ago",
      avatar: `${Sophia_Zhang}`,
      online: false,
    },
  ];

  // Dummy data for channels
  const publicChannels = [
    {
      id: 1,
      name: "Top Secret",
      icon: "🔒", // or your own icon
    },
    {
      id: 2,
      name: "Feedback",
      icon: "💬",
    },
    {
      id: 3,
      name: "Spaceship Crew",
      icon: "🚀",
      onlineCount: 4,
    },
    {
      id: 4,
      name: "User Interface",
      icon: "🖥",
    },
    {
      id: 5,
      name: "User Experience",
      icon: "✨",
    },
  ];
  const privateChannels = [
    {
      id: 6,
      name: "Private Channel 1",
      icon: "🔒",
    },
    {
      id: 7,
      name: "Private Channel 2",
      icon: "🔒",
    },
  ];

  // Switch channel function
  const handleChannelClick = (ch) => {
    // Update channel name & count in parent
    setChannelName(ch.name);
    // If it has an onlineCount, use it; else set a dummy
    setChannelCount(ch.onlineCount || 0);
    // Also set activeTab = "chats" if you want, or stay
  };

  return (
    <div className="w-72 bg-noble-black-800 flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "members" ? (
          <>
            {/* Currently Online */}
            <div className="mb-4">
              <h3 className="text-sm text-gray-400 uppercase mb-2">
                Currently Online ({onlineUsers.length})
              </h3>
              <div className="space-y-2">
                {onlineUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-noble-black-700"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-sm"
                      />
                      {/* Online dot */}
                      <span
                        className="
                          absolute top-0 right-0 w-2 h-2 bg-green-500
                          rounded-full border-2 border-noble-black-800
                        "
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offline */}
            <div>
              <h3 className="text-sm text-gray-400 uppercase mb-2">
                Offline ({offlineUsers.length})
              </h3>
              <div className="space-y-2">
                {offlineUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-noble-black-700 opacity-50"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-sm"
                      />
                      {/* Offline dot, e.g. gray or red */}
                      <span
                        className="
                          absolute top-0 right-0 w-2 h-2 bg-red-500
                          rounded-full border-2 border-noble-black-800
                        "
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-400">
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
            {/* Example: "Information" */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={chevron_right_icon} alt="" className="w-4 h-4" />
              <span className="text-sm text-gray-300">Information</span>
            </div>
            <hr className="border-noble-black-700" />

            {/* Public Channels Toggle */}
            <div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setPublicOpen(!publicOpen)}
              >
                {publicOpen ? (
                  <img src={chevron_down_icon} alt="" className="w-4 h-4" />
                ) : (
                  <img src={chevron_right_icon} alt="" className="w-4 h-4" />
                )}
                <span className="text-sm text-gray-300">Public Channels</span>
              </div>
              {publicOpen && (
                <div className="mt-2 ml-5 space-y-2">
                  {publicChannels.map((ch) => (
                    <button
                      key={ch.id}
                      className={`flex items-center gap-2 w-full text-left p-2 rounded hover:bg-noble-black-700 ${
                        channelName === ch.name
                          ? "border border-stem-green-500"
                          : ""
                      }`}
                      onClick={() => handleChannelClick(ch)}
                    >
                      <span>{ch.icon}</span>
                      <span className="text-sm text-white">{ch.name}</span>
                      {/* If there's an onlineCount */}
                      {ch.onlineCount && (
                        <span className="ml-auto text-xs text-gray-400">
                          {ch.onlineCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Private Channels Toggle */}
            <div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setPrivateOpen(!privateOpen)}
              >
                {privateOpen ? (
                  <img src={chevron_down_icon} alt="" className="w-4 h-4" />
                ) : (
                  <img src={chevron_right_icon} alt="" className="w-4 h-4" />
                )}
                <span className="text-sm text-gray-300">Private Channels</span>
              </div>
              {privateOpen && (
                <div className="mt-2 ml-5 space-y-2">
                  {privateChannels.map((ch) => (
                    <button
                      key={ch.id}
                      className={`flex items-center gap-2 w-full text-left p-2 rounded hover:bg-noble-black-700 ${
                        channelName === ch.name
                          ? "border border-stem-green-500"
                          : ""
                      }`}
                      onClick={() => handleChannelClick(ch)}
                    >
                      <span>{ch.icon}</span>
                      <span className="text-sm text-white">{ch.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tabs at Bottom */}
      <div className="p-2 flex justify-around border-t border-noble-black-700">
        <button
          className={`flex-1 text-center py-2 rounded hover:bg-noble-black-700 ${
            activeTab === "chats"
              ? "bg-noble-black-600 text-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("chats")}
        >
          Chats
        </button>
        <button
          className={`flex-1 text-center py-2 rounded hover:bg-noble-black-700 ${
            activeTab === "members"
              ? "bg-noble-black-600 text-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("members")}
        >
          Members
        </button>
      </div>
    </div>
  );
}

ChatRightPanel.propTypes = {
  channelName: PropTypes.string.isRequired,
  setChannelName: PropTypes.func.isRequired,
  channelCount: PropTypes.number.isRequired,
  setChannelCount: PropTypes.func.isRequired,
};
