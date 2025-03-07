import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import ChatRightPanel from "../components/layout/ChatRightPanel";

export default function ChatPage() {
  const [activeRightTab, setActiveRightTab] = useState("members");
  // can be "members" or "chats"

  return (
    <div className="flex h-screen bg-noble-black-700 text-gray-200">
      {/* Left Sidebar */}
      <Sidebar activeProject="Orbital Odyssey" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNav activeTab="chat" />

        {/* Middle Chat Section */}
        <div className="flex-1 p-6 flex">
          <div className="flex-1 mr-4 bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Spaceship Crew (4)</h2>

            {/* Example Chat Messages */}
            <div className="space-y-4">
              <div className="bg-gray-700 p-3 rounded">
                <p className="font-semibold">
                  Lily Patel{" "}
                  <span className="text-xs text-gray-400 ml-2">
                    27.04.2023, 13:30
                  </span>
                </p>
                <p className="mt-2 text-gray-300">
                  Agreed. In the meantime, let’s keep pushing forward with this
                  episode. I think it’s going to be a real crowd-pleaser.
                </p>
                {/* Reaction icons, etc. */}
              </div>

              <div className="bg-gray-700 p-3 rounded">
                <p className="font-semibold">
                  Adam Green{" "}
                  <span className="text-xs text-gray-400 ml-2">5 min ago</span>
                </p>
                <p className="mt-2 text-gray-300">
                  Hey guys, I was thinking about some character ideas for our
                  show. What do you think we should focus on?
                </p>
              </div>

              <div className="bg-gray-700 p-3 rounded">
                <p className="font-semibold">
                  Emily Liu{" "}
                  <span className="text-xs text-gray-400 ml-2">Just now</span>
                </p>
                <p className="mt-2 text-gray-300">
                  Well, we definitely need a strong leader character who can
                  command the crew and make tough decisions. @Artificium, can
                  you help?
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: toggles between "Members" and "Chats" */}
          <ChatRightPanel
            activeTab={activeRightTab}
            onTabChange={setActiveRightTab}
          />
        </div>

        {/* Bottom Input Bar */}
        <div className="p-4 bg-gray-800 flex items-center justify-between">
          <input
            type="text"
            placeholder="What you want to share today?"
            className="flex-1 bg-gray-700 rounded-l px-4 py-2 focus:outline-none"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
