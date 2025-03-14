import PropTypes from "prop-types";
import { useState } from "react";
import copy_icon from "../../assets/icons/copy_icon.svg";
import Adam_Green from "../../assets/avatar/Adam_Green.png";

export default function MessageBox({ message, nextMessage, onReplyClick }) {
  const [showReplies, setShowReplies] = useState(false);

  const isMainMessage = message.isMain;
  const isSameSenderAsNext =
    nextMessage &&
    !nextMessage.isMain &&
    message.user === nextMessage.user &&
    new Date(nextMessage.createdAt) - new Date(message.createdAt) < 60000;

  return (
    <div
      className={`relative mb-5 overflow-x-hidden max-w-[700px] ${
        isMainMessage ? "" : " "
      }`}
    >
      <div
        className={`rounded-lg p-4 relative ${
          isMainMessage ? "bg-noble-black-800" : "bg-noble-black-600 ml-12"
        } shadow-md`}
      >
        <div className="flex items-center justify-between mb-2 flex-wrap p-4">
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer">
              <img
                src={message.avatar || Adam_Green}
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

        <p
          className={`${
            isMainMessage ? "mb-3 mt-3 pl-20" : "mt-1 pl-15"
          } break-words font-medium text-noble-black-300 text-wrap`}
        >
          {message.text}
        </p>

        {message.images && message.images.length > 0 && (
          <div className="mt-2 flex gap-2">
            {[...Array(3)].map((_, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_SERVER_DOMAIN}${message.images[0]}`}
                alt="Attached"
                className="max-w-xs rounded"
              />
            ))}
          </div>
        )}

        {isMainMessage && (
          <div className="flex items-center gap-4 mb-3 mt-5 pl-20">
            <button
              onClick={() => onReplyClick(message.id)}
              className="text-noble-black-300 cursor-pointer"
            >
              <button className="text-noble-black-300 cursor-pointer text-sm font-semibold bg-noble-black-600 px-3 py-2 rounded-lg">
                Reply
              </button>
            </button>
            <div className="flex gap-5 text-xl">
              <span>🔥</span>
              <span>💅</span>
              <span>😊</span>
            </div>
          </div>
        )}
      </div>

      {message.replies && message.replies.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-gray-400 hover:text-white text-sm my-4 pl-7"
          >
            {showReplies
              ? "Hide replies"
              : `Show ${message.replies.length} replies`}
          </button>
          {showReplies &&
            message.replies.map((reply, index) => (
              <div key={`${message.id}-reply-${index}`}>
                <div
                  className={`rounded-lg p-4 relative bg-noble-black-600 ml-12 shadow-md`}
                >
                  <div className="flex items-center justify-between mb-2 flex-wrap p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative cursor-pointer">
                        <img
                          src={reply.avatar || Adam_Green}
                          alt={reply.user}
                          className="w-10 h-10 rounded-sm"
                        />
                        <span
                          className="
                              absolute top-0 right-0 w-2 h-2 bg-green-500
                              rounded-full border-2 border-noble-black-800
                            "
                        />
                      </div>
                      <div className="flex gap-4 justify-center items-center">
                        <p className="font-medium text-white cursor-pointer">
                          {reply.user}
                        </p>
                        <p className="text-xs text-gray-400">{reply.timeAgo}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white cursor-pointer">
                      <img src={copy_icon} alt="Copy" />
                    </button>
                  </div>
                  <p className="mt-1 pl-15 break-words font-medium text-noble-black-300 text-wrap">
                    {reply.text}
                  </p>
                  {reply.images && reply.images.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {[...Array(3)].map((_, index) => (
                        <img
                          key={index}
                          src={`${import.meta.env.VITE_SERVER_DOMAIN}${reply.images[0]}`}
                          alt="Attached"
                          className="max-w-xs rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
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
    images: PropTypes.arrayOf(PropTypes.string),
    isMain: PropTypes.bool.isRequired,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    replies: PropTypes.array,
  }).isRequired,
  nextMessage: PropTypes.shape({
    user: PropTypes.string,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    isMain: PropTypes.bool,
  }),
  onReplyClick: PropTypes.func.isRequired,
};

MessageBox.defaultProps = {
  nextMessage: null,
};