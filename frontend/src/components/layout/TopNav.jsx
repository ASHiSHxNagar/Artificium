import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//icons
import editIcon from "../../assets/icons/edit.svg";
import shareIcon from "../../assets/icons/share.svg";
import Artificium from "../../assets/icons/Artificium.svg";
import Chat from "../../assets/icons/comment-circle.svg";
import Library from "../../assets/icons/folder.svg";

//avatars
import Adam_Green from "../../assets/avatar/Adam_Green.png";
import Benjamin_Kim from "../../assets/avatar/Benjamin_Kim.png";
import Isabella_Chen from "../../assets/avatar/Isabella_Chen.png";
import Olivia_Sharma from "../../assets/avatar/Olivia_Sharma.png";

export default function TopNav({ activeTab, onShareClick }) {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tab) => {
    if (tab !== currentTab) {
      document
        .querySelector(`.tab-item.${currentTab}`)
        .classList.add("transition-out");
      setTimeout(() => {
        document
          .querySelector(`.tab-item.${currentTab}`)
          .classList.remove("active-tab", "transition-out");
        setCurrentTab(tab);
        document
          .querySelector(`.tab-item.${tab}`)
          .classList.add("transition-in");
        setTimeout(() => {
          document
            .querySelector(`.tab-item.${tab}`)
            .classList.remove("transition-in");
          document
            .querySelector(`.tab-item.${tab}`)
            .classList.add("active-tab");
        }, 300);
      }, 300);
    }
    navigate(`/${tab}`);
  };

  return (
    <div className="bg-noble-black-700 p-2 w-full">
      <div className="bg-noble-black-700  ">
        {/* Row 1: Title, subtitle, avatars, share/edit */}
        <div className="bg-noble-black-800 px-6 py-4 w-full rounded-t-2xl">
          <div className="flex items-center justify-between">
            {/* Left: Project Info */}
            <div>
              <h2 className="text-xl font-medium text-white">
                Orbital Odyssey
              </h2>
              <p className="text-sm text-noble-black-300 font-medium mt-2">
                Marketing Campaign for a new TV series Launch
              </p>
            </div>

            {/* Right: Avatars + Share + Edit */}
            <div className="flex items-center gap-6">
              {/* Avatars */}
              <div className="flex -space-x-2">
                <img
                  src={Adam_Green}
                  alt="user1"
                  className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                />
                <img
                  src={Benjamin_Kim}
                  alt="user2"
                  className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                />
                <img
                  src={Isabella_Chen}
                  alt="user3"
                  className="w-8 h-8 rounded-[1px] z-10 ml-1 border-r-4 border-b-2 border-[#0d0f10]"
                />
                <img
                  src={Olivia_Sharma}
                  alt="user4"
                  className="w-8 h-8 rounded-[1px] z-10 ml-1"
                />
                <div className="w-8 h-8 rounded-xl  z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-center text-xs flex items-center justify-center">
                  +4
                </div>
              </div>

              {/* Share Button */}
              <button
                type="button"
                onClick={onShareClick}
                className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
              >
                {/* Example: If you have a share icon, place it here */}
                <img src={shareIcon} alt="Share" className="w-4 h-4" />
                <span className="text-noble-black-300 text-sm font-semibold">
                  Share
                </span>
              </button>

              {/* Edit Button (dummy icon) */}
              <button
                type="button"
                className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
              >
                <div className="w-9 h-9 bg-noble-black-600  rounded-xl flex items-center justify-center">
                  <img src={editIcon} alt="Edit" className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Tabs */}
        <div className="mt-[2px] flex items-center gap-8 bg-noble-black-800 px-6 py-6 rounded-b-2xl">
          {/* Artificium Tab */}
          <div
            onClick={() => handleTabClick("artificium")}
            className={`tab-item artificium ${
              currentTab === "artificium" ? "active-tab" : ""
            } flex items-center justify-center gap-3 pb-2 text-sm font-semibold cursor-pointer`}
          >
            <img src={Artificium} alt="" className="w-4 h-4" />
            <button>Artificium</button>
          </div>

          {/* Chat Tab */}
          <div
            onClick={() => handleTabClick("chat")}
            className={`tab-item chat ${
              currentTab === "chat" ? "active-tab" : ""
            } flex items-center justify-center gap-3 pb-2 text-sm font-semibold cursor-pointer`}
          >
            <img src={Chat} alt="" className="w-4 h-4" />
            <button>Chat</button>
          </div>

          {/* Library Tab */}
          <div
            onClick={() => handleTabClick("library")}
            className={`tab-item library ${
              currentTab === "library" ? "active-tab" : ""
            } flex items-center justify-center gap-3 pb-2 text-sm font-semibold cursor-pointer`}
          >
            <img src={Library} alt="" className="w-4 h-4" />
            <button>Library</button>
          </div>
        </div>
      </div>
    </div>
  );
}

TopNav.propTypes = {
  /** Which tab is currently active: "artificium", "chat", or "library" */
  activeTab: PropTypes.string,
  /** Optional click handler for "Share" button */
  onShareClick: PropTypes.func,
};

TopNav.defaultProps = {
  activeTab: "",
  onShareClick: null,
};
