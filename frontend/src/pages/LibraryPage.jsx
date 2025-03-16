import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import LibraryDetailModal from "../components/layout/LibraryDetailModel";
import ShareModal from "../components/layout/ShareModal";

// Icons
import dots_icon from "../assets/icons/dots_icon.svg";
import chat_bubble_active_icon from "../assets/icons/chat_bubble_active_icon.svg";

// Images
import image_1 from "../assets/images/Image_1.png";
import image_2 from "../assets/images/Image_2.png";
import image_3 from "../assets/images/Image_3.png";
import image_4 from "../assets/images/Image_4.png";
import image_5 from "../assets/images/Image_5.png";
import image_6 from "../assets/images/Image_6.png";

// Avatars
import Adam_Green from "../assets/avatar/Adam_Green.png";
import Emily_Liu from "../assets/avatar/Emily_Liu.png";
import Lily_Patel from "../assets/avatar/Lily_Patel.png";
import Lucas_Ortiz from "../assets/avatar/Lucas_Ortiz.png";

export default function LibraryPage() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal handlers
  const openDetailModal = () => setShowDetailModal(true);
  const closeDetailModal = () => setShowDetailModal(false);
  const openShareModal = () => setShowShareModal(true);
  const closeShareModal = () => setShowShareModal(false);

  return (
    <div className="flex h-screen w-full bg-noble-black-700 text-gray-200">
      {/* Overlay for sidebar on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 bg-noble-black-800 transition-transform duration-300 ease-in-out z-50`}
      >
        <Sidebar activeProject="Orbital Odyssey" />
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-noble-black-600 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-12 md:mt-0 lg:pl-15">
        <TopNav activeTab="library" onShareClick={openShareModal} />

        {/* Desktop Layout */}
        <div
          className={`hidden md:grid grid-cols-[31%_31%_31%_7%] gap-4 px-10 py-5 max-h-screen overflow-y-scroll transition-all ${
            showDetailModal || showShareModal ? "blur-sm" : ""
          }`}
        >
          {/* Images Column */}
          <div className="flex-1 border-r border-gray-800 pr-6">
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
            {/* Card 1 */}
            <div className="bg-noble-black-800 p-4 rounded-xl mb-6">
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
                    +4
                  </div>
                </div>
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
            {/* Card 2 */}
            <div className="bg-noble-black-800 p-4 rounded-xl mb-6">
              <h3
                className="text-white text-base font-semibold mb-1 cursor-pointer"
                onClick={openDetailModal}
              >
                Cosmic Voyager
              </h3>
              <p className="text-noble-black-400 text-sm mb-4 mt-2">
                Main spacecraft used by the crew in the story...
              </p>
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
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

          {/* Documents Column */}
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
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

          {/* Ideas Column */}
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
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

          {/* Plus Button Column */}
          <div className="flex flex-col items-center w-10 min-h-screen">
            <button
              onClick={openDetailModal}
              className="cursor-pointer bg-noble-black-600 hover:bg-noble-black-600 text-white w-10 min-h-screen flex items-center justify-center rounded-md"
            >
              +
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div
          className={`md:hidden flex flex-col px-4 py-5 max-h-screen overflow-y-scroll transition-all ${
            showDetailModal || showShareModal ? "blur-sm" : ""
          }`}
        >
          {/* Images Section */}
          <div className="mb-6">
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
            <div className="bg-noble-black-800 p-4 rounded-xl mb-6">
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
                    +4
                  </div>
                </div>
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
            <div className="bg-noble-black-800 p-4 rounded-xl mb-6">
              <h3
                className="text-white text-base font-semibold mb-1 cursor-pointer"
                onClick={openDetailModal}
              >
                Cosmic Voyager
              </h3>
              <p className="text-noble-black-400 text-sm mb-4 mt-2">
                Main spacecraft used by the crew in the story...
              </p>
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
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

          {/* Documents Section */}
          <div className="mb-6">
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
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

          {/* Ideas Section */}
          <div className="mb-6">
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
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
                  <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-xs flex items-center justify-center">
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

          {/* Floating Plus Button */}
          <button
            onClick={openDetailModal}
            className="fixed bottom-4 right-4 z-50 p-4 bg-noble-black-600 rounded-full text-white text-2xl"
          >
            +
          </button>
        </div>
      </div>

      {/* Modals */}
      {showDetailModal && <LibraryDetailModal onClose={closeDetailModal} />}
      {showShareModal && <ShareModal onClose={closeShareModal} />}
    </div>
  );
}
