// import your share icon or use an icon from react-icons
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function TopNav({ activeTab, onShareClick }) {
  const navigate = useNavigate();

  return (
    <div className="bg-nobel-black-800 px-6 py-4 flex items-center justify-between">
      {/* Left: Project Info */}
      <div>
        <h2 className="text-xl font-bold">Orbital Oddysey</h2>
        <p className="text-sm text-gray-400">
          Marketing Campaign for a new TV series Launch
        </p>
      </div>

      {/* Middle: Tabs */}
      <div className="ml-6 flex space-x-6">
        <button
          onClick={() => navigate("/artificium")}
          className={`${
            activeTab === "artificium" ? "text-green-400" : "text-gray-300"
          } hover:text-white cursor-pointer`}
        >
          Artificium
        </button>
        <button
          onClick={() => navigate("/chat")}
          className={`${
            activeTab === "chat" ? "text-green-400" : "text-gray-300"
          } hover:text-white cursor-pointer`}
        >
          Chat
        </button>
        <button
          onClick={() => navigate("/library")}
          className={`${
            activeTab === "library" ? "text-green-400" : "text-gray-300"
          } hover:text-white cursor-pointer`}
        >
          Library
        </button>
      </div>

      {/* Right: Avatars + Share Button */}
      <div className="flex items-center space-x-4">
        {/* Example user avatars */}
        <div className="flex -space-x-2">
          <img
            src="https://via.placeholder.com/28"
            alt="user1"
            className="w-7 h-7 rounded-full border-2 border-gray-800"
          />
          <img
            src="https://via.placeholder.com/28"
            alt="user2"
            className="w-7 h-7 rounded-full border-2 border-gray-800"
          />
          <img
            src="https://via.placeholder.com/28"
            alt="user3"
            className="w-7 h-7 rounded-full border-2 border-gray-800"
          />
          <div className="w-7 h-7 rounded-full border-2 border-gray-800 bg-gray-600 text-center text-xs flex items-center justify-center">
            +4
          </div>
        </div>

        {onShareClick && (
          <button
            onClick={onShareClick}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            Share
          </button>
        )}
      </div>
    </div>
  );
}

TopNav.propTypes = {
  activeTab: PropTypes.string,
  onShareClick: PropTypes.func,
};

TopNav.defaultProps = {
  activeTab: "",
  onShareClick: null,
};
