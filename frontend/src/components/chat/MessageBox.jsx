import PropTypes from "prop-types";
import { useState } from "react";
import copy_icon from "../../assets/icons/copy_icon.svg";
import emoji_icon from "../../assets/icons/folder.svg";
import reply_icon from "../../assets/icons/padlock_icon.svg";

export default function MessageBox({ message, nextMessage, onReplyClick }) {
  const [showReplies, setShowReplies] = useState(false);

  const isMainMessage = message.isMain;
  const isSameSenderAsNext =
    nextMessage &&
    !nextMessage.isMain &&
    message.user === nextMessage.user &&
    new Date(nextMessage.createdAt) - new Date(message.createdAt) < 60000;

  return (
    <div className="relative min-w-[700px] max-w-[710px]">
      {/* Message Container */}
      <div
        className={`rounded-lg p-4 relative ${
          isMainMessage ? "bg-noble-black-700" : "bg-noble-black-600 ml-12"
        } shadow-md`}
      >
        {/* Top row: user + date + copy icon */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {isMainMessage && (
              <div className="relative cursor-pointer">
                <img
                  src={message.avatar}
                  alt={message.user}
                  className="w-10 h-10 rounded-sm"
                />
                <span
                  className="
                    absolute top-0 right-0 w-2 h-2 bg-green-500
                    rounded-full border-2 border-noble-black-800
                  "
                />
              </div>
            )}
            <div
              className={`flex gap-4 justify-center items-center ${
                isMainMessage ? "ml-2 mt-2" : ""
              }`}
            >
              <p className="font-medium text-white cursor-pointer">
                {message.user}
              </p>
              <p className="text-xs text-gray-400">
                {isMainMessage ? message.date : message.timeAgo}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white cursor-pointer">
            <img src={copy_icon} alt="Copy" />
          </button>
        </div>

        {/* Message text */}
        <p
          className={`${
            isMainMessage ? "mb-3 mt-3 pl-15" : "mt-1 pl-15"
          } break-words font-medium text-noble-black-300`}
        >
          {message.text}
        </p>

        {/* Reply and Emoji buttons for main message */}
        {isMainMessage && (
          <div className="flex items-center gap-4 mb-3 mt-5 pl-15">
            <button
              onClick={() => onReplyClick(message.id)}
              className="text-noble-black-300 cursor-pointer"
            >
              <img src={reply_icon} alt="Reply" className="w-5 h-5" />
            </button>
            <button className="text-noble-black-300 cursor-pointer">
              <img src={emoji_icon} alt="Emoji" className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Replies (if any) */}
      {message.replies && message.replies.length > 0 && (
        <div className="ml-12 mt-2">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-gray-400 hover:text-white text-sm mb-2"
          >
            {showReplies
              ? "Hide replies"
              : `Show ${message.replies.length} replies`}
          </button>
          {showReplies &&
            message.replies.map((reply, index) => (
              <MessageBox
                key={`${message.id}-reply-${index}`}
                message={{
                  id: `${message.id}-reply-${index}`,
                  avatar: reply.avatar,
                  user: reply.user,
                  timeAgo: reply.timeAgo,
                  text: reply.text,
                  isMain: false,
                  createdAt: reply.createdAt,
                }}
                nextMessage={
                  message.replies[index + 1] || { user: "", createdAt: null }
                }
                onReplyClick={() => {}}
              />
            ))}
        </div>
      )}
    </div>
  );
}

MessageBox.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    user: PropTypes.string.isRequired,
    date: PropTypes.string,
    timeAgo: PropTypes.string,
    text: PropTypes.string.isRequired,
    isMain: PropTypes.bool.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
    replies: PropTypes.array,
  }).isRequired,
  nextMessage: PropTypes.shape({
    user: PropTypes.string,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    isMain: PropTypes.bool,
  }),
  onReplyClick: PropTypes.func.isRequired,
};

MessageBox.defaultProps = {
  nextMessage: null,
};