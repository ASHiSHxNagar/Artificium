import { useState } from "react";
import PropTypes from "prop-types";

// Dummy icons/images (replace with your own)

import fullscreen_icon from "../../assets/icons/fullscreen_icon.svg";
import cross_icon from "../../assets/icons/cross_icon.svg";
import chat_icon from "../../assets/icons/chat_icon.svg";
import chat_active_icon from "../../assets/icons/chat_active_icon.svg";
import images_icon from "../../assets/icons/image_icon.svg";
import images_active_icon from "../../assets/icons/images_active.svg";
import comments_icon from "../../assets/icons/comment_icon.svg";
import comments_active_icon from "../../assets/icons/comment_active_icon.svg";
import moreIcon from "../../assets/icons/dots_icon.svg"; // e.g. the three-dot icon
// Example images
import image1 from "../../assets/images/Image_1.png";
import image2 from "../../assets/images/Image_2.png";
import image3 from "../../assets/images/Image_3.png";
// etc.

export default function LibraryDetailModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("images");
  // could be "chat", "images", or "comments"

  return (
    <>
      <div className="absolute top-0 right-0  z-50 bg-noble-black-700 o ">
        {/* Modal container */}
        <div
          className=" w-[620px] h-screen text-white overflow-hidden  bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl"
        >
          <div className="absolute top-9 right-14">
            <button className="  text-gray-400 hover:text-gray-200 cursor-pointer pr-10 ">
              <img
                src={fullscreen_icon}
                alt="fullscreen_icon"
                className="w-4 h-4 hover:scale-115"
                onClick={() => alert("Fullscreen clicked")}
              />
            </button>

            <button
              onClick={onClose}
              className=" text-gray-400 hover:text-gray-200 cursor-pointer pr-5 "
            >
              <img
                src={cross_icon}
                alt="cross_icon"
                className="w-4 h-4 hover:scale-115"
              />
            </button>
          </div>
          {/* Content wrapper with scroll */}
          <div className="h-full overflow-y-auto p-6">
            {/* Title + short paragraph */}
            <h2 className="text-2xl font-semibold mb-2">Captain Drake</h2>
            <p className="text-noble-black-300 text-sm mb-6">
              Natural born leader with years of experience in space exploration.
            </p>

            {/* Tabs */}
            <div className="flex items-center gap-6 mb-4 border-b border-gray-700">
              {/* Chat Tab */}
              <button
                onClick={() => setActiveTab("chat")}
                className={`pb-2 flex items-center gap-2 ${
                  activeTab === "chat"
                    ? "text-white border-b-2 border-green-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {activeTab === "chat" ? (
                  <img
                    src={chat_active_icon}
                    alt="chat_icon"
                    className="w-4 h-4"
                  />
                ) : (
                  <img src={chat_icon} alt="chat_icon" className="w-4 h-4" />
                )}

                <span className="text-sm font-semibold">Chat</span>
              </button>

              {/* Images Tab */}
              <button
                onClick={() => setActiveTab("images")}
                className={`pb-2 flex items-center gap-2 ${
                  activeTab === "images"
                    ? "text-white border-b-2 border-green-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {activeTab === "images" ? (
                  <img
                    src={images_active_icon}
                    alt="images_icon"
                    className="w-4 h-4"
                  />
                ) : (
                  <img
                    src={images_icon}
                    alt="images_icon"
                    className="w-4 h-4"
                  />
                )}
                <span className="text-sm font-semibold">Images</span>
              </button>

              {/* Comments Tab */}
              <button
                onClick={() => setActiveTab("comments")}
                className={`pb-2 flex items-center gap-2 ${
                  activeTab === "comments"
                    ? "text-white border-b-2 border-green-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {activeTab === "comments" ? (
                  <img
                    src={comments_active_icon}
                    alt="comments_icon"
                    className="w-4 h-4"
                  />
                ) : (
                  <img
                    src={comments_icon}
                    alt="comments_icon"
                    className="w-4 h-4"
                  />
                )}
                <span className="text-sm font-semibold">Comments</span>
              </button>
            </div>

            {/* Main content depending on activeTab */}
            {activeTab === "chat" && (
              <div>
                {/* Dummy chat content */}
                <p className="text-sm text-gray-300 mb-2">[Chat tab content]</p>
                <div className="space-y-4">
                  <div className="bg-noble-black-700 p-3 rounded">
                    <p className="text-gray-200">
                      User1: Hello, how’s it going?
                    </p>
                  </div>
                  <div className="bg-noble-black-700 p-3 rounded">
                    <p className="text-gray-200">
                      User2: Doing well, just exploring Captain Drake’s
                      storyline.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "images" && (
              <div>
                {/* Example images by date */}
                <div className="mb-6">
                  <h3 className="text-sm text-gray-400 mb-2">12 April</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="relative">
                      <img
                        src={image1}
                        alt="April 12 image 1"
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded"
                      />
                      <button
                        onClick={() => alert("More clicked")}
                        className="absolute top-2 right-2 bg-noble-black-600 hover:bg-noble-black-500 text-gray-300 rounded-sm p-2 cursor-pointer"
                      >
                        <img src={moreIcon} alt="More" className="w-2 h-2" />
                      </button>
                    </div>
                    <div className="relative">
                      <img
                        src={image2}
                        alt="April 12 image 2"
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded"
                      />
                      <button
                        onClick={() => alert("More clicked")}
                        className="absolute top-2 right-2 bg-noble-black-600 hover:bg-noble-black-500 text-gray-300 rounded-sm p-2 cursor-pointer"
                      >
                        <img src={moreIcon} alt="More" className="w-2 h-2" />
                      </button>
                    </div>
                    <div className="relative">
                      <img
                        src={image3}
                        alt="April 12 image 3"
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded"
                      />
                      <button
                        onClick={() => alert("More clicked")}
                        className="absolute top-2 right-2 bg-noble-black-600 hover:bg-noble-black-500 text-gray-300 rounded-sm p-2 cursor-pointer"
                      >
                        <img src={moreIcon} alt="More" className="w-2 h-2" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm text-gray-400 mb-2">3 April</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="relative">
                      <img
                        src={image2}
                        alt="April 3 image 1"
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded"
                      />
                      <button
                        onClick={() => alert("More clicked")}
                        className="absolute top-2 right-2 bg-noble-black-600 hover:bg-noble-black-500 text-gray-300 rounded-sm p-2 cursor-pointer"
                      >
                        <img src={moreIcon} alt="More" className="w-2 h-2" />
                      </button>
                    </div>
                    <div className="relative">
                      <img
                        src={image3}
                        alt="April 3 image 2"
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded"
                      />
                      <button
                        onClick={() => alert("More clicked")}
                        className="absolute top-2 right-2 bg-noble-black-600 hover:bg-noble-black-500 text-gray-300 rounded-sm p-2 cursor-pointer"
                      >
                        <img src={moreIcon} alt="More" className="w-2 h-2" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm text-gray-400 mb-2">2 April</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="relative">
                      <img
                        src={image1}
                        alt="April 2 image 1"
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded"
                      />
                      <button
                        onClick={() => alert("More clicked")}
                        className="absolute top-2 right-2 bg-noble-black-600 hover:bg-noble-black-500 text-gray-300 rounded-sm p-2 cursor-pointer"
                      >
                        <img src={moreIcon} alt="More" className="w-2 h-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "comments" && (
              <div>
                {/* Dummy comments content */}
                <p className="text-sm text-gray-300 mb-2">
                  [Comments tab content]
                </p>
                <ul className="space-y-4">
                  <li className="bg-noble-black-700 p-3 rounded">
                    <p className="text-gray-200">User1: This is amazing!</p>
                  </li>
                  <li className="bg-noble-black-700 p-3 rounded">
                    <p className="text-gray-200">
                      {/* eslint-disable-next-line */}
                      User2: I'd love to see more about the backstory.
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

LibraryDetailModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
