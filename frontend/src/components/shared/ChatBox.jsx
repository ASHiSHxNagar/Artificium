// import { useState } from "react";
import PropTypes from "prop-types";

//icons
// import dots_icon from "../assets/icons/dots_icon.svg";
import copy_icon from "../assets/icons/copy_icon.svg";
import ChatInput from "../components/chat/ChatInput";

//avatars
import Adam_Green from "../assets/avatar/Adam_Green.png";
import Emily_Liu from "../assets/avatar/Emily_Liu.png";
import Lily_Patel from "../assets/avatar/Lily_Patel.png";

export default function ChatBox() {


  // Example chat messages (dummy)
  const messages = [
    {
      id: 1,
      avatar: `${Lily_Patel}`,
      user: "Lily Patel 🌸",
      date: "27.04.2023, 13:30",
      text: "Agreed. In the meantime, let's keep pushing forward with this episode. I think it's going to be a real crowd-pleaser.",
      isMain: true, // if you want to highlight or show a big box
    },
    {
      id: 2,
      divider: "Today",
    },
    {
      id: 3,
      avatar: `${Adam_Green}`,
      user: "Adam Green",
      timeAgo: "5 min ago",
      text: "Hey guys, I was thinking about some character ideas for our show. What do you think we should focus on?",
      isMain: false,
    },
    {
      id: 4,
      avatar: `${Emily_Liu}`,
      user: "Emily Liu",
      timeAgo: "5 sec ago",
      text: "Well, we definitely need a strong leader character who can command the crew and make tough decisions. @Artificium, can you help?",
      isMain: false,
    },
  ];

  return (
    <div className="flex h-screen bg-noble-black-700 text-gray-200">
      {/* Left Sidebar (same as Artificium) */}

        {/* Middle + Right Panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Middle Chat Section */}
          <div className=" pb-[150px] flex-1 flex flex-col bg-noble-black-700 p-4 overflow-y-auto  ">
            {/* Channel Header */}
            {/* Could put other icons on the right if needed */}

            {/* Chat Messages */}
            <div className="space-y-6">
              {messages.map((msg) =>
                msg.divider ? (
                  // "Today" or any divider
                  <div
                    key={msg.id}
                    className="text-center text-sm text-gray-500"
                  >
                    {msg.divider}
                  </div>
                ) : (
                  <div
                    key={msg.id}
                    className={`rounded-lg p-4  ${
                      msg.isMain
                        ? "shadow-md bg-noble-black-800"
                        : "border border-gray-700 bg-noble-black-700"
                    }`}
                  >
                    {/* Top row: user + date + copy icon */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="relative cursor-pointer">
                          <img
                            src={msg.avatar}
                            alt={msg.name}
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
                        <div className="flex gap-4 justify-center items-center ml-2 mt-2">
                          <p className="font-medium text-white cursor-pointer">
                            {msg.user}
                          </p>
                          {/* Show date or timeAgo */}
                          {msg.isMain ? (
                            <p className="text-xs text-gray-400">{msg.date}</p>
                          ) : (
                            <p className="text-xs text-gray-400">
                              {msg.timeAgo}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* Copy icon */}
                      <button className="text-gray-400 hover:text-white cursor-pointer">
                        <img src={copy_icon} alt="" />
                      </button>
                    </div>
                    {/* Message text */}
                    <p className="text-noble-black-300 mb-3 mt-3 pl-15 break-words font-medium">
                      {" "}
                      {msg.text}
                    </p>

                    {/* If main box, show reply + emojis */}
                    {msg.isMain && (
                      <div className="flex items-center gap-4 mb-3 mt-5 pl-15">
                        <button className="text-noble-black-300 cursor-pointer text-sm font-semibold bg-noble-black-600 px-3 py-2 rounded-lg">
                          Reply
                        </button>
                        <div className="flex gap-5 text-xl">
                          <span>🔥</span>
                          <span>💅</span>
                          <span>😊</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Bottom Chat Input */}

            <ChatInput width="max-w-[calc(100vw-660px)]" />
          </div>

         
        </div>
      </div>
  );
}

ChatBox.propTypes = {
  /** Optional click handler for "Share" button */
  onShareClick: PropTypes.func,
};

ChatBox.defaultProps = {
  onShareClick: null,
};
