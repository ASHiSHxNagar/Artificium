import PropTypes from "prop-types";
import copy_icon from "../../assets/icons/copy_icon.svg";

// Function to generate 3 random emojis
const getRandomEmojis = () => {
  const emojis = ["🔥", "💅", "😊", "🚀", "🎉", "🌟", "💡", "👾", "🤖", "🖖"];
  const shuffled = emojis.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

export default function MessageBox({ message, nextMessage }) {
  const isMain = message.isMain;
  const randomEmojis = isMain ? getRandomEmojis() : [];

  return (
    <div
      className={`relative min-w-[700px]  max-w-[710px] ${
        isMain ? "pl-0" : "pl-20"
      }`}
    >
      {/* Message Container */}
      <div
        className={`rounded-lg p-4 relative ${
          isMain
            ? "shadow-md bg-noble-black-800"
            : "border border-gray-700 bg-noble-black-700"
        }`}
      >
        {/* Top row: user + date + copy icon */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer">
              <img
                src={message.avatar}
                alt={message.user}
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
                {message.user}
              </p>
              {isMain ? (
                <p className="text-xs text-gray-400">{message.date}</p>
              ) : (
                <p className="text-xs text-gray-400">{message.timeAgo}</p>
              )}
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

        {/* If main box, show reply + emojis */}
        {isMain && (
          <div className="flex items-center gap-4 mb-3 mt-5 pl-15">
            <button className="text-noble-black-300 cursor-pointer text-sm font-semibold bg-noble-black-600 px-3 py-2 rounded-lg">
              Reply
            </button>
            <div className="flex gap-5 text-xl">
              {randomEmojis.map((emoji, index) => (
                <span key={index}>{emoji}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

MessageBox.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    date: PropTypes.string,
    timeAgo: PropTypes.string,
    text: PropTypes.string.isRequired,
    isMain: PropTypes.bool,
  }).isRequired,
  nextMessage: PropTypes.object,
};

MessageBox.defaultProps = {
  nextMessage: null,
};
