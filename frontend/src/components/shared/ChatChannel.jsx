import square from "../../assets/icons/square.svg";
import square_orange from "../../assets/icons/square_orange.svg";
import triangle from "../../assets/icons/triangle.svg";
import circle from "../../assets/icons/circle.svg";
import PropTypes from "prop-types";

// Array of icon objects
let icon_images = [
  { id: 1, icon: square },
  { id: 2, icon: square_orange },
  { id: 3, icon: triangle },
  { id: 4, icon: circle },
];

// Function to get a random icon
const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * icon_images.length);
  return icon_images[randomIndex].icon;
};

export default function ChatChannel({ chats, selectedChat, onSelectChat }) {
  // Destructure props
  // Get random icon for this instance
  const randomIcon = getRandomIcon();

  return (
    <>
      {(chats || []).map((chat) => (
        <div
          key={chat._id}
          className={`flex items-center gap-2 px-2 py-2 mb-1 rounded cursor-pointer ${
            selectedChat && selectedChat._id === chat._id
              ? "bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)] backdrop-blur-sm"
              : "onHover"
          }`}
          onClick={() => onSelectChat(chat)}
        >
          <img
            src={randomIcon}
            alt="Chat Icon"
            className={`w-${
              selectedChat && selectedChat._id === chat._id ? "5" : "4"
            } h-${selectedChat && selectedChat._id === chat._id ? "5" : "4"} ${
              selectedChat && selectedChat._id === chat._id
                ? "shadow-[0_10px_6px_-4px_#B6F09C29,0_5px_3px_-3px_#B6F09C29]"
                : "shadow-[0_10px_6px_-4px_#BD3B3A29,0_5px_3px_-3px_#BD3B3A29]"
            }`}
          />
          <span className="text-sm font-semibold text-noble-black-100 ml-2">
            {chat.title}
          </span>
        </div>
      ))}
    </>
  );
}

ChatChannel.propTypes = {
  activeProject: PropTypes.string,
  chats: PropTypes.array,
  selectedChat: PropTypes.object,
  onSelectChat: PropTypes.func,
};

ChatChannel.defaultProps = {
  activeProject: "",
  chats: [],
  selectedChat: null,
  onSelectChat: () => {},
};
