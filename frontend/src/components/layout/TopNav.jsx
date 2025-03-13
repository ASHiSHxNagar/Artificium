import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Icons
import editIcon from "../../assets/icons/edit.svg";
import shareIcon from "../../assets/icons/share.svg";
import Artificium from "../../assets/icons/Artificium.svg";
import Artificium_Inactive from "../../assets/icons/Artificium_Inactive.svg";
import Chat from "../../assets/icons/comment-circle.svg";
import Chat_Active from "../../assets/icons/comment-circle_active.svg";
import Folder from "../../assets/icons/folder.svg";
import Folder_Active from "../../assets/icons/folder_active.svg";

// Avatars
import Adam_Green from "../../assets/avatar/Adam_Green.png";
import Benjamin_Kim from "../../assets/avatar/Benjamin_Kim.png";
import Isabella_Chen from "../../assets/avatar/Isabella_Chen.png";
import Olivia_Sharma from "../../assets/avatar/Olivia_Sharma.png";
import { lookInSession } from "../shared/Session";

export default function TopNav({ activeTab, onShareClick, activeProject }) {
  const navigate = useNavigate();
  const workspaceSlug = lookInSession("workspaceSlug"); // Get workspaceSlug from URL
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Update active tab based on URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("allchats")) {
      setCurrentTab("chat");
    } else if (path.includes("library")) {
      setCurrentTab("library");
    } else {
      setCurrentTab("artificium");
    }
  }, [window.location.pathname]);

  const handleTabClick = (tab) => {
    if (tab !== currentTab) {
      // Handle tab transition animation
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

    // Navigation logic based on tab
    if (tab === "artificium") {
      navigate(`/artificium/${workspaceSlug}`);
    } else if (tab === "chat") {
      // Assuming workspace._id is passed or stored in session
      const workspaceId = sessionStorage.getItem("workspaceId"); // Adjust based on how you store workspaceId
      if (workspaceId) {
        navigate(`/artificium/workspace/${workspaceId}/allchats`);
      } else {
        console.error("Workspace ID not found for chat navigation");
      }
    } else if (tab === "library") {
      navigate(`/artificium/${workspaceSlug}/library`);
    }
  };

  return (
    <div className="bg-noble-black-700 p-2 pr-3 w-full">
      <div className="bg-noble-black-700">
        {/* Row 1: Title, subtitle, avatars, share/edit */}
        <div className="bg-noble-black-800 px-6 py-4 w-full rounded-t-2xl">
          <div className="flex items-center justify-between">
            {/* Left: Project Info */}
            <div>
              <h2 className="text-xl font-medium text-white">
                {activeProject || "Orbital Odyssey"}
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
                <div className="w-8 h-8 rounded-xl z-0 bg-noble-black-600 text-noble-black-400 font-semibold text-center text-xs flex items-center justify-center">
                  +4
                </div>
              </div>

              {/* Share Button */}
              <button
                type="button"
                onClick={onShareClick}
                className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
              >
                <img src={shareIcon} alt="Share" className="w-4 h-4" />
                <span className="text-noble-black-300 text-sm font-semibold">
                  Share
                </span>
              </button>

              {/* Edit Button */}
              <button
                type="button"
                className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
              >
                <div className="w-9 h-9 bg-noble-black-600 rounded-xl flex items-center justify-center">
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
            } flex items-center justify-center gap-3 pb-2 text-sm font-semibold cursor-pointer text-gray-300 hover:text-white`}
          >
            {currentTab === "artificium" ? (
              <img src={Artificium} alt="Artificium Icon" className="w-4 h-4" />
            ) : (
              <img
                src={Artificium_Inactive}
                alt="Artificium Inactive Icon"
                className="w-4 h-4"
              />
            )}
            <button>Artificium</button>
          </div>

          {/* Chat Tab */}
          <div
            onClick={() => handleTabClick("chat")}
            className={`tab-item chat ${
              currentTab === "chat" ? "active-tab" : ""
            } flex items-center justify-center gap-3 pb-2 text-sm font-semibold cursor-pointer text-gray-300 hover:text-white`}
          >
            {currentTab === "chat" ? (
              <img
                src={Chat_Active}
                alt="Chat Active Icon"
                className="w-4 h-4"
              />
            ) : (
              <img src={Chat} alt="Chat Icon" className="w-4 h-4" />
            )}
            <button>Chat</button>
          </div>

          {/* Library Tab */}
          <div
            onClick={() => handleTabClick("library")}
            className={`tab-item library ${
              currentTab === "library" ? "active-tab" : ""
            } flex items-center justify-center gap-3 pb-2 text-sm font-semibold cursor-pointer text-gray-300 hover:text-white`}
          >
            {currentTab === "library" ? (
              <img
                src={Folder_Active}
                alt="Library Active Icon"
                className="w-4 h-4"
              />
            ) : (
              <img src={Folder} alt="Library Icon" className="w-4 h-4" />
            )}
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
  /** The name of the active project/workspace */
  activeProject: PropTypes.string,
};

TopNav.defaultProps = {
  activeTab: "artificium",
  onShareClick: null,
  activeProject: "Orbital Odyssey",
};
