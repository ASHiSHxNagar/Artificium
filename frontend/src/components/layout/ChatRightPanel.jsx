import { useState } from "react";
import PropTypes from "prop-types";

//icons
import chevron_right_icon from "../../assets/icons/chevron-right.svg";
import chevron_down_icon from "../../assets/icons/chevron-down.svg";
import chat_bubble_icon from "../../assets/icons/chat_bubble_icon.svg";
import users_icon from "../../assets/icons/users_icon.svg";
import globe_icon_2 from "../../assets/icons/globe_icon_2.svg";
import padlock_icon from "../../assets/icons/padlock_icon.svg";
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
  channelCount,
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
      icon: `${padlock_icon}`, // or your own icon
    },
    {
      id: 2,
      name: "Feedback",
      icon: `${globe_icon_2}`,
    },
    {
      id: 3,
      name: "Spaceship Crew",
      icon: `${globe_icon_2}`,
      onlineCount: 4,
    },
    {
      id: 4,
      name: "User Interface",
      icon: `${globe_icon_2}`,
    },
    {
      id: 5,
      name: "User Experience",
      icon: `${globe_icon_2}`,
    },
  ];
  const privateChannels = [
    {
      id: 6,
      name: "Private Channel 1",
      icon: `${padlock_icon}`,
    },
    {
      id: 7,
      name: "Private Channel 2",
      icon: `${padlock_icon}`,
    },
  ];

  // "Spaceship Crew" has id=3 in publicChannels, so let's expand it by default
  const [expandedChannel, setExpandedChannel] = useState(3);

  const handleChannelToggle = (channelId) => {
    if (expandedChannel === channelId) {
      setExpandedChannel(null);
    } else {
      setExpandedChannel(channelId);
    }
  };

  // Switch channel function
  const handleChannelClick = (ch) => {
    // Update channel name & count in parent
    setChannelName(ch.name);
    // If it has an onlineCount, use it; else set a dummy
    setChannelCount(channelCount || 0);
    // Also set activeTab = "chats" if you want, or stay
  };

  return (
    <div className="w-75 bg-noble-black-700 flex flex-col pb-5 pr-5 ">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4">
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
                      <span className="text-sm font-medium text-white">
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
                      <span className="text-sm font-medium text-white">
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
            {/* Example: "Information" */}
            <div className="flex items-center gap-2 cursor-pointer pb-3  border-b border-gray-800">
              <img src={chevron_right_icon} alt="" className="w-3 h-3" />
              <span className="text-sm text-gray-300 ">Information</span>
            </div>

            {/* Public Channels Toggle */}
            <div className="pb-3  border-b border-gray-800 ">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setPublicOpen(!publicOpen)}
              >
                {publicOpen ? (
                  <img src={chevron_down_icon} alt="" className="w-3 h-3" />
                ) : (
                  <img src={chevron_right_icon} alt="" className="w-3 h-3" />
                )}
                <span className="text-sm text-gray-300">Public Channels</span>
              </div>
              {publicOpen &&
                publicChannels.map((ch) => (
                  <div key={ch.id} className="grid grid-cols-1 mt-3 ">
                    {/* 1) The channel button */}
                    <div
                      className={` ${
                        channelName === ch.name
                          ? "border-[1px] border-gray-700 rounded-xl"
                          : ""
                      }`}
                    >
                      <button
                        className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-noble-black-700"
                        onClick={() => {
                          handleChannelClick(ch); // keeps your original channel switching
                          handleChannelToggle(ch.id); // NEW: toggles expand/collapse
                        }}
                      >
                        <img src={ch.icon} alt="" className="w-4 h-4" />
                        <span className="text-base text-noble-black-400 font-semibold cursor-pointer">
                          {ch.name}
                        </span>
                        {channelName == ch.name && (
                          <div
                            className="
                         w-8 h-8 rounded-xl text-stem-green-600 ml-auto
                         flex items-center justify-center
                         bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                         backdrop-blur-sm
                       "
                          >
                            {channelCount}
                          </div>
                        )}
                      </button>

                      <div className="relative top-0 left-0 ">
                        {/* 2) Conditionally show the 4 "online" users if this channel is expanded */}
                        {expandedChannel === ch.id && (
                          <div className="relative mb-2 mr-2 p-3">
                            {/* Vertical line on the left */}
                            <div className="absolute left-4 top-4 bottom-4 w-px h-43 bg-gray-600" />

                            <div className="flex flex-col space-y-3 pl-8">
                              {/* 1) Adam Green */}
                              <div className="flex items-center gap-3 relative">
                                {/* Horizontal “branch” line */}
                                <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-px bg-gray-500" />
                                <div className="relative">
                                  <img
                                    src={Adam_Green}
                                    alt=""
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
                                <span className="text-sm text-noble-black-300 font-semibold">
                                  Adam Green
                                </span>
                              </div>

                              {/* 2) David Singh */}
                              <div className="flex items-center gap-3 relative">
                                <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-px bg-gray-500" />

                                <div className="relative">
                                  <img
                                    src={David_Singh}
                                    alt=""
                                    className="w-10 h-10 rounded-sm"
                                  />
                                  <span
                                    className="
                             absolute top-0 right-0 w-2 h-2 bg-green-500
                             rounded-full border-2 border-noble-black-800
                           "
                                  />
                                </div>
                                <span className="text-sm text-noble-black-300 font-semibold">
                                  David Singh
                                </span>
                              </div>

                              {/* 3) Harper Singh */}
                              <div className="flex items-center gap-3 relative">
                                <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-px bg-gray-500" />

                                <div className="relative">
                                  <img
                                    src={Harper_Singh}
                                    alt=""
                                    className="w-10 h-10 rounded-sm"
                                  />
                                  <span
                                    className="
                                 absolute top-0 right-0 w-2 h-2 bg-green-500
                                 rounded-full border-2 border-noble-black-800
                               "
                                  />
                                </div>
                                <span className="text-sm text-noble-black-300 font-semibold">
                                  Harper Singh
                                </span>
                              </div>

                              {/* 4) Lily Patel */}
                              <div className="flex items-center gap-3 relative">
                                <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-px bg-gray-500" />

                                <div className="relative">
                                  <img
                                    src={Lily_Patel}
                                    alt=""
                                    className="w-10 h-10 rounded-sm"
                                  />
                                  <span
                                    className="
                                   absolute top-0 right-0 w-2 h-2 bg-green-500
                                    rounded-full border-2 border-noble-black-800
                                 "
                                  />
                                </div>
                                <span className="text-sm text-noble-black-300 font-semibold">
                                  Lily Patel
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Private Channels Toggle */}
            <div className="pb-3  border-b border-gray-800 ">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setPrivateOpen(!privateOpen)}
              >
                {privateOpen ? (
                  <img src={chevron_down_icon} alt="" className="w-3 h-3" />
                ) : (
                  <img src={chevron_right_icon} alt="" className="w-3 h-3" />
                )}
                <span className="text-sm text-gray-300">Private Channels</span>
              </div>
              {privateOpen &&
                privateChannels.map((ch) => (
                  <div key={ch.id} className="grid grid-cols-1 mt-3 ">
                    {/* 1) The channel button */}
                    <div
                      className={` ${
                        channelName === ch.name
                          ? "border-[1px] border-gray-700 rounded-xl"
                          : ""
                      }`}
                    >
                      <button
                        className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-noble-black-700"
                        onClick={() => {
                          handleChannelClick(ch); // keeps your original channel switching
                          handleChannelToggle(ch.id); // NEW: toggles expand/collapse
                        }}
                      >
                        <img src={ch.icon} alt="" className="w-4 h-4" />
                        <span className="text-base text-noble-black-400 font-semibold cursor-pointer">
                          {ch.name}
                        </span>
                        {channelName == ch.name && (
                          <div
                            className="
                         w-8 h-8 rounded-xl text-stem-green-600 ml-auto
                         flex items-center justify-center
                         bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                         backdrop-blur-sm
                       "
                          >
                            {channelCount}
                          </div>
                        )}
                      </button>

                      <div className="relative top-0 left-0 ">
                        {/* 2) Conditionally show the 4 "online" users if this channel is expanded */}
                        {expandedChannel === ch.id && (
                          <div className="relative mb-2 mr-2 p-3">
                            {/* Vertical line on the left */}
                            <div className="absolute left-4 top-4 bottom-4 w-px h-43 bg-gray-600" />

                            <div className="flex flex-col space-y-3 pl-8">
                              {/* 1) Adam Green */}
                              <div className="flex items-center gap-3 relative">
                                {/* Horizontal “branch” line */}
                                <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-px bg-gray-500" />
                                <div className="relative">
                                  <img
                                    src={Adam_Green}
                                    alt=""
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
                                <span className="text-sm text-noble-black-300 font-semibold">
                                  Adam Green
                                </span>
                              </div>

                              {/* 2) David Singh */}
                              <div className="flex items-center gap-3 relative">
                                <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-px bg-gray-500" />

                                <div className="relative">
                                  <img
                                    src={David_Singh}
                                    alt=""
                                    className="w-10 h-10 rounded-sm"
                                  />
                                  <span
                                    className="
                             absolute top-0 right-0 w-2 h-2 bg-green-500
                             rounded-full border-2 border-noble-black-800
                           "
                                  />
                                </div>
                                <span className="text-sm text-noble-black-300 font-semibold">
                                  David Singh
                                </span>
                              </div>

                              {/* 3) Harper Singh */}
                              <div className="flex items-center gap-3 relative">
                                <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-px bg-gray-500" />

                                <div className="relative">
                                  <img
                                    src={Harper_Singh}
                                    alt=""
                                    className="w-10 h-10 rounded-sm"
                                  />
                                  <span
                                    className="
                                 absolute top-0 right-0 w-2 h-2 bg-green-500
                                 rounded-full border-2 border-noble-black-800
                               "
                                  />
                                </div>
                                <span className="text-sm text-noble-black-300 font-semibold">
                                  Harper Singh
                                </span>
                              </div>

                              {/* 4) Lily Patel */}
                              <div className="flex items-center gap-3 relative">
                                <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-px bg-gray-500" />

                                <div className="relative">
                                  <img
                                    src={Lily_Patel}
                                    alt=""
                                    className="w-10 h-10 rounded-sm"
                                  />
                                  <span
                                    className="
                                   absolute top-0 right-0 w-2 h-2 bg-green-500
                                    rounded-full border-2 border-noble-black-800
                                 "
                                  />
                                </div>
                                <span className="text-sm text-noble-black-300 font-semibold">
                                  Lily Patel
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabs at Bottom */}
      <div className=" flex justify-around border-[1px] border-gray-800 rounded-2xl">
        <button
          className={`flex items-center justify-center text-center py-2 rounded hover:bg-noble-black-700 ${
            activeTab === "chats"
              ? "px-3 py-1 bg-noble-black-600 text-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("chats")}
        >
          <img src={chat_bubble_icon} alt="" className="pr-5 " />
          Chats
        </button>
        <button
          className={`flex items-center justify-center text-center py-2 rounded hover:bg-noble-black-700 ${
            activeTab === "members"
              ? "px-3 py-1 bg-noble-black-600 text-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("members")}
        >
          Members
          <img src={users_icon} alt="" className="pl-5" />
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
