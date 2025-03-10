import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import ChatInput from "../components/chat/ChatInput";
import Content from "../components/chat/Content";
import PropTypes from "prop-types";

export default function ArtificiumPage({ onShareClick }) {
  return (
    <div className="flex h-screen w-full bg-noble-black-700 text-gray-200">
      {/* Left Sidebar */}
      <Sidebar activeProject="Orbital Odyssey" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNav activeTab="artificium" onShareClick={onShareClick} />

        {/* Page Content */}
        <div className="p-6 flex-1">
          {/* Example 4-column layout */}
          <Content />
        </div>

        {/* Bottom Input Bar (like a prompt area) */}
        {/* Pass a different width here */}
        <ChatInput width="max-w-[calc(100vw-320px)]" />
      </div>
    </div>
  );
}

ArtificiumPage.propTypes = {
  /** Optional click handler for "Share" button */
  onShareClick: PropTypes.func,
};

ArtificiumPage.defaultProps = {
  onShareClick: null,
};
