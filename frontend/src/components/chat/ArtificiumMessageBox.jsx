import PropTypes from "prop-types";
import copy_icon from "../../assets/icons/copy_icon.svg";
import loadingIcon from "../../assets/icons/bouncing-circles.svg";
import Artificium from "../../assets/avatar/Artificium.png"; // Bot avatar
import Ryan_Lee from "../../assets/avatar/Ryan_Lee.png"; // User avatar

export default function ArtificiumMessageBox({ message, isRegenerating, onRegenerate }) {
  const isBot = message.sender === "bot";

  const modifyOptions = [
    { icon: "../../assets/icons/sparkle.svg", text: "Create variation" },
    { icon: "../../assets/icons/adjust.svg", text: "Adjust" },
    { icon: "../../assets/icons/share.svg", text: "Share" },
    { icon: "../../assets/icons/export.svg", text: "Export" },
  ];

  return (
    <div className="relative min-w-[700px] max-w-[710px]">
      {/* Message Container */}
      <div className="rounded-lg p-4 relative bg-noble-black-700 shadow-md">
        {/* Top row: user + date + copy icon */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer">
              <img
                src={isBot ? Artificium : Ryan_Lee}
                alt={isBot ? "Artificium" : "You"}
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
                {isBot ? "Artificium" : "You"}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(message.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white cursor-pointer">
            <img src={copy_icon} alt="Copy" />
          </button>
        </div>

        {/* Message text */}
        <p className="text-noble-black-300 mb-3 mt-3 pl-15 break-words font-medium">
          {message.text}
        </p>

        {/* Image if present */}
        {message.image && (
          <img
            src={`${import.meta.env.VITE_SERVER_DOMAIN}${message.image}`}
            alt="Attached"
            className="mt-2 max-w-xs rounded"
          />
        )}

        {/* Bot buttons (Regenerate Response and Modify) */}
        {isBot && !isRegenerating && (
          <div className="flex items-center gap-4 mb-3 mt-5 pl-15">
            <button
              onClick={() => onRegenerate(message._id)}
              className="text-noble-black-300 cursor-pointer text-sm font-semibold bg-noble-black-600 px-3 py-2 rounded-lg hover:bg-noble-black-500"
            >
              Regenerate response
            </button>
            <div className="relative group">
              <button className="text-noble-black-300 cursor-pointer text-sm font-semibold bg-noble-black-600 px-3 py-2 rounded-lg hover:bg-noble-black-500 flex items-center gap-2">
                Modify
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute bottom-full left-0 mb-2 w-40 bg-noble-black-800 rounded shadow-lg hidden group-hover:block z-10">
                {modifyOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 hover:bg-noble-black-700 cursor-pointer"
                  >
                    <img src={option.icon} alt={option.text} className="w-4 h-4" />
                    <span className="text-sm text-white">{option.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading animation during regeneration */}
        {isRegenerating && (
          <div className="rounded-lg p-4 relative bg-noble-black-700 shadow-md mt-4">
            <div className="flex items-center gap-2">
              <img
                src={loadingIcon}
                alt="Loading"
                className="w-5 h-5 animate-spin"
              />
              <span className="text-white">Generating...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ArtificiumMessageBox.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string,
    sender: PropTypes.oneOf(["user", "bot"]).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  isRegenerating: PropTypes.bool,
  onRegenerate: PropTypes.func.isRequired,
};

ArtificiumMessageBox.defaultProps = {
  isRegenerating: false,
};