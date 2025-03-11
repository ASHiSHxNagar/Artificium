import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import LibraryDetailModal from "../components/layout/LibraryDetailModel";
// Import your ShareModal
import ShareModal from "../components/layout/ShareModal";

// icons
import dots_icon from "../assets/icons//dots_icon.svg";
import chat_bubble_active_icon from "../assets/icons/chat_bubble_active_icon.svg";

// images
import image_1 from "../assets/images/Image_1.png";
import image_2 from "../assets/images/Image_2.png";
import image_3 from "../assets/images/Image_3.png";
import image_4 from "../assets/images/Image_4.png";
import image_5 from "../assets/images/Image_5.png";
import image_6 from "../assets/images/Image_6.png";

import Adam_Green from "../assets/avatar/Adam_Green.png";
import Emily_Liu from "../assets/avatar/Emily_Liu.png";
import Lily_Patel from "../assets/avatar/Lily_Patel.png";
import Lucas_Ortiz from "../assets/avatar/Lucas_Ortiz.png";

export default function LibraryPage() {
  // State to track whether our detail modal is open
  const [showDetailModal, setShowDetailModal] = useState(false);

  // State to track whether the share modal is open
  const [showShareModal, setShowShareModal] = useState(false);

  // Open/close library detail modal
  const openDetailModal = () => {
    setShowDetailModal(true);
  };
  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  // Open/close share modal
  const openShareModal = () => {
    setShowShareModal(true);
  };
  const closeShareModal = () => {
    setShowShareModal(false);
  };

  return (
    <div className="flex h-screen bg-noble-black-700 text-gray-200">
      <Sidebar activeProject="Orbital Odyssey" />

      <div className="flex-1 flex flex-col">
        {/* Pass onShareClick to TopNav so the "Share" button opens share modal */}
        <TopNav activeTab="library" onShareClick={openShareModal} />

        {/* 
          Wrap the main library content in a div that conditionally 
          applies blur-sm if either modal is open 
        */}
        <div
          className={`grid grid-cols-[31%_31%_31%_7%] gap-4 px-10 py-5 max-h-screen overflow-y-scroll transition-all ${
            showDetailModal || showShareModal ? "blur-sm" : ""
          }`}
        >
          {/* COLUMN 1: IMAGES */}
          <div className="flex-1 border-r border-gray-800 pr-6">
            {/* Column header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white pl-2">Images</h2>
              <button>
                <img
                  src={dots_icon}
                  alt="Menu"
                  className="w-4 h-4 cursor-pointer"
                />
              </button>
            </div>

            {/* CARD 1 */}
            <div className="bg-noble-black-800 p-4 rounded-xl mb-6">
              {/* Clicking title opens modal */}
              <h3
                className="text-white text-base font-semibold mb-1 cursor-pointer"
                onClick={openDetailModal}
              >
                Captain Drake
              </h3>
              <p className="text-noble-black-400 text-sm mb-4 mt-2">
                Natural born leader with years of experience in space
                exploration.
              </p>

              {/* Big images row */}
              <div className="flex space-x-2 mb-3">
                <img
                  src={image_1}
                  alt="Captain Drake 1"
                  className="w-18 h-18 object-cover rounded-md"
                />
                <img
                  src={image_2}
                  alt="Captain Drake 2"
                  className="w-18 h-18 object-cover rounded-md"
                />
                <img
                  src={image_3}
                  alt="Captain Drake 3"
                  className="w-18 h-18 object-cover rounded-md"
                />
              </div>

              <hr className="border-gray-700 mb-5 mt-5" />

              {/* Avatars + number + chat */}
              <div className="flex items-center justify-between">
                {/* Avatar stack */}
                <div className="flex items-center -space-x-2">
                  <img
                    src={Adam_Green}
                    alt="user1"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Emily_Liu}
                    alt="user2"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lily_Patel}
                    alt="user3"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lucas_Ortiz}
                    alt="user4"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1"
                  />
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-center text-xs flex items-center justify-center">
                    +4
                  </div>
                </div>
                {/* Right side: number + chat icon */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-white">12</span>
                  <button className="text-gray-400 hover:text-white">
                    <img
                      src={chat_bubble_active_icon}
                      alt=""
                      className="w-4 h-4 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-noble-black-800 p-4 rounded-xl mb-6">
              <h3
                className="text-white text-base font-semibold mb-1 cursor-pointer"
                onClick={openDetailModal}
              >
                Cosmic Voyager
              </h3>
              <p className="text-noble-black-400 text-sm mb-4 mt-2">
                Main spacecraft used by the crew in the story. It is a highly
                advanced vessel designed to withstand harsh conditions...
              </p>

              {/* Big images row */}
              <div className="flex space-x-2 mb-3">
                <img
                  src={image_4}
                  alt="Cosmic Voyager 1"
                  className="w-18 h-18 object-cover rounded-md"
                />
                <img
                  src={image_5}
                  alt="Cosmic Voyager 2"
                  className="w-18 h-18 object-cover rounded-md"
                />
                <img
                  src={image_6}
                  alt="Cosmic Voyager 3"
                  className="w-18 h-18 object-cover rounded-md"
                />
              </div>

              <hr className="border-gray-700 mb-5 mt-5" />

              {/* Avatars + number + chat */}
              <div className="flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  <img
                    src={Adam_Green}
                    alt="user1"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Emily_Liu}
                    alt="user2"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lily_Patel}
                    alt="user3"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lucas_Ortiz}
                    alt="user4"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1"
                  />
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-center text-xs flex items-center justify-center">
                    +4
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-white">27</span>
                  <button className="text-gray-400 hover:text-white">
                    <img
                      src={chat_bubble_active_icon}
                      alt=""
                      className="w-4 h-4 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: DOCUMENTS */}
          <div className="flex-1 border-r border-gray-800 pr-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white pl-2">
                Documents
              </h2>
              <button>
                <img
                  src={dots_icon}
                  alt="Menu"
                  className="w-4 h-4 cursor-pointer"
                />
              </button>
            </div>

            {/* Example Document Card */}
            <div className="bg-noble-black-800 p-4 rounded-xl mb-6">
              <h3
                className="text-white text-base font-semibold mb-1 cursor-pointer"
                onClick={openDetailModal}
              >
                Character Bios
              </h3>
              <p className="text-noble-black-400 text-sm mb-3">
                3 documents, 43832 words
              </p>

              <hr className="border-gray-700 mb-5 mt-5" />

              <div className="flex items-center justify-between">
                {/* Avatar stack */}
                <div className="flex items-center -space-x-2">
                  <img
                    src={Adam_Green}
                    alt="user1"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Emily_Liu}
                    alt="user2"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lily_Patel}
                    alt="user3"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lucas_Ortiz}
                    alt="user4"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1"
                  />
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-center text-xs flex items-center justify-center">
                    +4
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-white">0</span>
                  <button className="text-gray-400 hover:text-white">
                    <img
                      src={chat_bubble_active_icon}
                      alt=""
                      className="w-4 h-4 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Another Document Card */}
            <div className="bg-noble-black-800 p-4 rounded-xl mb-6">
              <h3
                className="text-white text-base font-semibold mb-1 cursor-pointer"
                onClick={openDetailModal}
              >
                Plot Outline
              </h3>
              <p className="text-noble-black-400 text-sm mb-3">
                1 document, 18745 words
              </p>

              <hr className="border-gray-700 mb-5 mt-5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  <img
                    src={Adam_Green}
                    alt="user1"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Emily_Liu}
                    alt="user2"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lily_Patel}
                    alt="user3"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lucas_Ortiz}
                    alt="user4"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1"
                  />
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-center text-xs flex items-center justify-center">
                    +4
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-white">0</span>
                  <button className="text-gray-400 hover:text-white">
                    <img
                      src={chat_bubble_active_icon}
                      alt=""
                      className="w-4 h-4 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* ...Add more Document cards as needed... */}
          </div>

          {/* COLUMN 3: IDEAS (no right border) */}
          <div className="flex-1 pr-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white pl-2">Ideas</h2>
              <button>
                <img
                  src={dots_icon}
                  alt="Menu"
                  className="w-4 h-4 cursor-pointer"
                />
              </button>
            </div>

            {/* Example Idea Card */}
            <div className="bg-noble-black-800 p-4 rounded-xl mb-6">
              <p
                className="text-white text-base font-semibold mb-1 cursor-pointer"
                onClick={openDetailModal}
              >
                Concept art for potential new characters or locations.
              </p>

              <hr className="border-gray-700 mb-5 mt-5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  <img
                    src={Adam_Green}
                    alt="user1"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Emily_Liu}
                    alt="user2"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lily_Patel}
                    alt="user3"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lucas_Ortiz}
                    alt="user4"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1"
                  />
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-center text-xs flex items-center justify-center">
                    +4
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-white">0</span>
                  <button className="text-gray-400 hover:text-white">
                    <img
                      src={chat_bubble_active_icon}
                      alt=""
                      className="w-4 h-4 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Another Idea Card */}
            <div className="bg-noble-black-800 p-4 rounded-xl mb-6">
              <p
                className="text-white text-base font-semibold mb-1 cursor-pointer"
                onClick={openDetailModal}
              >
                A list of potential plot points or story arcs.
              </p>

              <hr className="border-gray-700 mb-5 mt-5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  <img
                    src={Adam_Green}
                    alt="user1"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Emily_Liu}
                    alt="user2"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lily_Patel}
                    alt="user3"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                  />
                  <img
                    src={Lucas_Ortiz}
                    alt="user4"
                    className="w-8 h-8 rounded-[1px] z-10 ml-1"
                  />
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-center text-xs flex items-center justify-center">
                    +4
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-white">0</span>
                  <button className="text-gray-400 hover:text-white">
                    <img
                      src={chat_bubble_active_icon}
                      alt=""
                      className="w-4 h-4 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* VERTICAL PLUS BUTTON */}
          <div className="flex flex-col items-center w-10 min-h-screen">
            <button
              onClick={openDetailModal}
              className="cursor-pointer bg-noble-black-600 hover:bg-noble-black-600 text-white w-10 min-h-screen flex items-center justify-center rounded-md"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render the detail modal */}
      {showDetailModal && <LibraryDetailModal onClose={closeDetailModal} />}

      {/* Conditionally render the share modal */}
      {showShareModal && <ShareModal onClose={closeShareModal} />}
    </div>
  );
}
