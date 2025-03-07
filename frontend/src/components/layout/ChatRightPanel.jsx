import PropTypes from "prop-types";

export default function ChatRightPanel({ activeTab, onTabChange }) {
  return (
    <div className="w-64 bg-nobel-black-800 rounded-lg p-4">
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${
            activeTab === "chats"
              ? "bg-gray-700 text-green-400"
              : "hover:bg-gray-700"
          }`}
          onClick={() => onTabChange("chats")}
        >
          Chats
        </button>
        <button
          className={`px-3 py-1 rounded ${
            activeTab === "members"
              ? "bg-gray-700 text-green-400"
              : "hover:bg-gray-700"
          }`}
          onClick={() => onTabChange("members")}
        >
          Members
        </button>
      </div>

      {/* Content */}
      {activeTab === "members" ? (
        <div>
          <h3 className="text-sm text-gray-400 mb-2">Currently Online (4)</h3>
          <div className="mb-2 bg-gray-700 p-2 rounded">Adam Green</div>
          <div className="mb-2 bg-gray-700 p-2 rounded">David Singh</div>
          <div className="mb-2 bg-gray-700 p-2 rounded">Harper Singh</div>
          <div className="mb-2 bg-gray-700 p-2 rounded">Lily Patel</div>

          <h3 className="text-sm text-gray-400 mt-4 mb-2">Offline (12)</h3>
          <div className="mb-2 bg-gray-700 p-2 rounded">Lucas Ortiz</div>
          <div className="mb-2 bg-gray-700 p-2 rounded">Marcus Chen</div>
          <div className="mb-2 bg-gray-700 p-2 rounded">Mia Park</div>
          <div className="mb-2 bg-gray-700 p-2 rounded">Olivia Sharma</div>
          <div className="mb-2 bg-gray-700 p-2 rounded">Sophia Zhang</div>
          {/* etc. */}
        </div>
      ) : (
        <div>
          <h3 className="text-sm text-gray-400 mb-2">Public Channels</h3>
          <div className="mb-2 bg-gray-700 p-2 rounded">Top Secret</div>
          <div className="mb-2 bg-gray-700 p-2 rounded">Feedback</div>
          <div className="mb-2 bg-gray-700 p-2 rounded">Spaceship Crew</div>

          <h3 className="text-sm text-gray-400 mt-4 mb-2">Private Channels</h3>
          <div className="mb-2 bg-gray-700 p-2 rounded">User interface</div>
          <div className="mb-2 bg-gray-700 p-2 rounded">User experience</div>
        </div>
      )}
    </div>
  );
}

ChatRightPanel.propTypes = {
  /** "chats" or "members" to indicate which tab is active */
  activeTab: PropTypes.string.isRequired,
  /** Function to handle tab change, e.g. setState in parent */
  onTabChange: PropTypes.func.isRequired,
};

ChatRightPanel.defaultProps = {
  activeTab: "members",
  onTabChange: () => {},
};
