import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import ShareModal from "../components/layout/ShareModal";
import ChatInput from "../components/chat/ChatInput";
import Content from "../components/chat/Content";

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
          {/* Example 4-column layout */}
          <Content />
        </div>

        {/* Bottom Input Bar (like a prompt area) */}
        <ChatInput />
      </div>

      {showShareModal && <ShareModal onClose={handleCloseShare} />}
    </div>
  );
}
