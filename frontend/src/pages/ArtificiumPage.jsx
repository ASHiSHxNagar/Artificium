import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import ShareModal from "../components/layout/ShareModal";

export default function ArtificiumPage() {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleOpenShare = () => {
    setShowShareModal(true);
  };

  const handleCloseShare = () => {
    setShowShareModal(false);
  };

  return (
    <div className="flex h-screen bg-noble-black-700 text-gray-200">
      {/* Left Sidebar */}
      <Sidebar activeProject="Orbital Odyssey" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNav activeTab="artificium" onShareClick={handleOpenShare} />

        {/* Page Content */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">
            Innovation Starter Pack
          </h1>
          <p className="text-gray-400 mb-8">
            Kickstart your innovation process with our comprehensive selection
            of predefined prompts.
          </p>

          {/* Example 4-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Column 1: Creative Assets */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Creative Assets</h2>
              <ul className="space-y-2">
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  UI wireframe <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Brochure design <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Social media <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Brand guidelines{" "}
                  <span className="text-green-400">&rarr;</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Developer Tools */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Developer Tools</h2>
              <ul className="space-y-2">
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  API Integration <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Test automation <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  DB optimization <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Code review <span className="text-green-400">&rarr;</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Content Creation */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Content Creation</h2>
              <ul className="space-y-2">
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Product description{" "}
                  <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  E-mail copy <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Whitepaper <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Press release <span className="text-green-400">&rarr;</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Idea Generation */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Idea Generation</h2>
              <ul className="space-y-2">
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Hashtag ideas <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Brainstorming <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Trend analysis <span className="text-green-400">&rarr;</span>
                </li>
                <li className="flex justify-between hover:bg-gray-700 p-2 rounded cursor-pointer">
                  Social media posts{" "}
                  <span className="text-green-400">&rarr;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Input Bar (like a prompt area) */}
        <div className="p-4 bg-gray-800 flex items-center justify-between">
          <input
            type="text"
            placeholder="You can ask me anything! I am here to help."
            className="flex-1 bg-gray-700 rounded-l px-4 py-2 focus:outline-none"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r">
            Send
          </button>
        </div>
      </div>

      {showShareModal && <ShareModal onClose={handleCloseShare} />}
    </div>
  );
}
