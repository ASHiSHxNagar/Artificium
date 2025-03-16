import PropTypes from "prop-types";
import copy_icon from "../../assets/icons/copy_icon.svg";
import loadingIcon from "../../assets/icons/bouncing-circles.svg";
import Artificium from "../../assets/avatar/Artificium.png";
import Ryan_Lee from "../../assets/avatar/Ryan_Lee.png";

import magic_wand from "../../assets/icons/magic_wand.svg";
import sliders from "../../assets/icons/sliders.svg";
import link from "../../assets/icons/link.svg";
import download from "../../assets/icons/download.svg";
import { useState } from "react";
import moreIcon from "../../assets/icons/dots_icon.svg";
import chevron_down from "../../assets/icons/chevron-down.svg";

export default function ArtificiumMessageBox({
  message,
  isRegenerating,
  onRegenerate,
}) {
  const isBot = message.sender === "bot";

  const [modifyVisable, setModifyVisable] = useState(false);

  function handleModifyClick() {
    setModifyVisable(!modifyVisable);
  }

  const modifyOptions = [
    { icon: magic_wand, text: "Create variation" },
    { icon: sliders, text: "Adjust" },
    { icon: link, text: "Share" },
    { icon: download, text: "Export" },
  ];

  return (
    <div className="relative w-full pr-2 sm:pr-4 md:pr-6 lg:pr-10">
      <div className="rounded-lg p-2 sm:p-3 lg:p-4 relative bg-noble-black-700 shadow-md border-1 border-gray-500">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
            <div className="relative cursor-pointer">
              <img
                src={isBot ? Artificium : Ryan_Lee}
                alt={isBot ? "Artificium" : "You"}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-sm"
              />
              <span
                className="
                  absolute top-0 right-0 w-1 h-1 sm:w-2 sm:h-2  bg-green-500
                  rounded-full border-2 border-noble-black-800
                "
              />
            </div>
            <div className="flex gap-2 lg:gap-4 justify-center items-center ml-2 mt-2">
              <p className="font-medium text-white cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg">
                {isBot ? "Artificium" : "You"}
              </p>
              <p className="text-[8px] sm:text-xs md:text-sm text-base text-gray-400">
                {new Date(message.createdAt).toLocaleTimeString()}
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

        <p className="text-noble-black-300 mb-3 mt-3 pl-7 sm:pl-8 md:pl-12  lg:pl-15 break-words font-medium text-xs sm:text-sm md:text-base  ">
          {message.text}
        </p>

        {message.image && (
          <div className="mt-3 flex gap-2 pl-5 sm:pl-8 md:pl-12  lg:pl-15">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="relative">
                <img
                  src={message.image}
                  alt="Attached"
                  className=" imgwh_400 w-20 h-20 sm:w-32 sm:h-32 md:w-35 md:h-35 lg:w-42 lg:h-42 object-cover rounded"
                />
                <button
                  onClick={() => alert("More clicked")}
                  className="absolute top-1 right-1 md:top-2 md:right-2 bg-noble-black-600 hover:bg-noble-black-500 text-gray-300 rounded-sm p-1 cursor-pointer"
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

        {isBot && !isRegenerating && (
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3  lg:gap-4 mb-3 mt-5 pl-5 sm:pl-8 md:pl-12  lg:pl-15">
            <button
              onClick={() => onRegenerate(message._id)}
              className="text-noble-black-300 cursor-pointer text-[8px] sm:text-xs md:text-sm lg:text-base  font-semibold bg-noble-black-600 px-3 py-2 rounded-lg hover:bg-noble-black-500"
            >
              Regenerate response
            </button>
            <div className="relative">
              <button
                className="text-noble-black-300 cursor-pointer text-[8px] sm:text-xs md:text-sm lg:text-base font-semibold bg-noble-black-600 px-3 py-2 rounded-lg hover:bg-noble-black-500 flex items-center gap-2"
                onClick={handleModifyClick}
              >
                Modify
                <img
                  src={chevron_down}
                  alt="arrow down "
                  className="w-1 h-1 sm:w-2 sm:h-2 lg:w-3 lg:h-3"
                />
              </button>
              <div
                className={`hidden absolute bottom-full p-4 left-0 mb-2 w-50 bg-noble-black-800 rounded shadow-lg z-10  ${
                  modifyVisable ? "md:block" : "hidden"
                }`}
              >
                {modifyOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 hover:bg-noble-black-700 cursor-pointer"
                  >
                    <img
                      src={option.icon}
                      alt={option.text}
                      className="w-4 h-4 mr-4"
                    />
                    <span className="text-sm text-white">{option.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
