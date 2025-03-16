import PropTypes from "prop-types";
import { useState } from "react";
import copy_icon from "../../assets/icons/copy_icon.svg";
import Adam_Green from "../../assets/avatar/Adam_Green.png";
import moreIcon from "../../assets/icons/dots_icon.svg";

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
      className={`relative mb-5 overflow-x-hidden w-full ${
        isMainMessage ? "" : " "
      }`}
    >
      <div
        className={`rounded-lg p-2 lg:p-4 relative ${
          isMainMessage ? "bg-noble-black-800" : "bg-noble-black-600 ml-12"
        } shadow-md`}
      >
        <div className="flex items-center justify-between mb-2 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer">
              <img
                src={message.avatar || Adam_Green}
                alt={message.user}
                className=" w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-sm"
              />
              <span
                className="
                    absolute top-0 right-0 w-1 h-1 sm:w-2 sm:h-2  bg-green-500
                    rounded-full border-2 border-noble-black-800
                  "
              />
            </div>
            <div
              className={`flex gap-2 lg:gap-4 justify-center items-center ${
                isMainMessage ? "ml-2 mt-2" : ""
              }`}
            >
              <p className="font-medium text-white cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg">
                {message.user}
              </p>
              <p className=" text-gray-400 text-[8px] sm:text-xs md:text-sm text-base">
                {isMainMessage ? message.date : message.timeAgo}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white cursor-pointer ">
            <img
              src={copy_icon}
              alt="Copy"
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
            />
          </button>
        </div>

        <p
          className={`${
            isMainMessage
              ? " pl-7 sm:pl-6 md:pl-10  lg:pl-15"
              : " pl-7 sm:pl-8 md:pl-12  lg:pl-20"
          } break-words font-medium text-noble-black-300 text-wrap text-xs sm:text-sm md:text-base `}
        >
          {message.text}
        </p>

        {message.images && message.images.length > 0 && (
          <div className="mt-3 flex gap-2 pl-9 sm:pl-11 md:pl-13 lg:pl-15">
            {message.images.slice(0, 3).map((imageUrl, index) => (
              <div key={`main-image-${index}`} className="relative">
                <img
                  src={imageUrl}
                  alt="Attached"
                  className=" replayimgwh_400 w-20 h-20 sm:w-32 sm:h-32 md:w-35 md:h-35 lg:w-42 lg:h-42 object-cover rounded"
                />
                <button
                  onClick={() => alert("More clicked")}
                  className="absolute top-1 right-1 md:top-2 md:right-2 bg-noble-black-600 hover:bg-noble-black-500 text-gray-300 rounded-sm p-2 cursor-pointer"
                >
                  <img
                    src={moreIcon}
                    alt="More"
                    className="w-1 h-1 md:w-2 md:h-2 "
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {isMainMessage && (
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4  mb-3 mt-5 pl-5 sm:pl-9 md:pl-15  lg:pl-20">
            <button
              onClick={() => onReplyClick(message.id)}
              className="text-noble-black-300 cursor-pointer"
            >
              <button className="text-noble-black-300 cursor-pointer  text-xs sm:text-sm md:text-base  font-semibold bg-noble-black-600  px-2 py-1 lg:px-3 lg:py-2 rounded-lg">
                Reply
              </button>
            </button>
            <div className="flex  gap-1 sm:gap-2 md:gap-3 lg:gap-5  text-xs sm:text-sm md:text-base ">
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
            className="text-gray-400 hover:text-white text-sm my-4 sm:pl-1 md:pl-4 lg:pl-7"
          >
            {showReplies
              ? "Hide replies"
              : `Show ${message.replies.length} replies`}
          </button>
          {showReplies &&
            message.replies.map((reply, index) => (
              <div
                key={`${message.id}-reply-${index}`}
                className=" mt-2 lg:mt-4"
              >
                <div
                  className={`rounded-lg p-4 relative bg-noble-black-600 ml-5 sm:ml-5   md:ml-8 lg:ml-12 shadow-md`}
                >
                  <div className="flex items-center justify-between mb-2 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="relative cursor-pointer">
                        <img
                          src={reply.avatar || Adam_Green}
                          alt={reply.user}
                          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-sm"
                        />
                        <span
                          className="
                              absolute top-0 right-0 w-1 h-1 sm:w-2 sm:h-2 bg-green-500
                              rounded-full border-2 border-noble-black-800
                            "
                        />
                      </div>
                      <div className="flex gap-2  lg:gap-4 justify-center items-center">
                        <p className="font-medium text-white cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg">
                          {reply.user}
                        </p>
                        <p className="text-[8px] sm:text-xs md:text-sm text-base text-gray-400">
                          {reply.timeAgo}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white cursor-pointer">
                      <img
                        src={copy_icon}
                        alt="Copy"
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                      />
                    </button>
                  </div>
                  <p className="mt-1 pl-7 sm:pl-8 md:pl-12  lg:pl-20 break-words font-medium text-noble-black-300 text-wrap text-xs sm:text-sm md:text-basep">
                    {reply.text}
                  </p>
                  {reply.images && reply.images.length > 0 && (
                    <div className="mt-3 flex gap-2 pl-11 sm:pl-14 md:pl-16 lg:pl-20">
                      {reply.images.slice(0, 3).map((imageUrl, index) => (
                        <div key={`reply-image-${index}`} className="relative">
                          <img
                            src={imageUrl}
                            alt="Attached"
                            className="replayimgwh_400 w-20 h-20 sm:w-32 sm:h-32 md:w-35 md:h-35 lg:w-42 lg:h-42 object-cover rounded"
                          />
                          <button
                            onClick={() => alert("More clicked")}
                            className="absolute top-2 right-2 bg-noble-black-600 hover:bg-noble-black-500 text-gray-300 rounded-sm p-2 cursor-pointer"
                          >
                            <img
                              src={moreIcon}
                              alt="More"
                              className="w-1 h-1 md:w-2 md:h-2"
                            />
                          </button>
                        </div>
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
