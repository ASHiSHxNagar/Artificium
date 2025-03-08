import PropTypes from "prop-types";
// Avatars
import Intellisys from "../../assets/avatar/Intellisys.png";
import Ryan_Lee from "../../assets/avatar/Ryan_Lee.png";
// Icons
import arrow_down from "../../assets/icons/arrow_down.svg";
import search from "../../assets/icons/search.svg";
import credit_card from "../../assets/icons/credit_card.svg";
import square from "../../assets/icons/square.svg";
import square_orange from "../../assets/icons/square_orange.svg";
import triangle from "../../assets/icons/triangle.svg";
import circle from "../../assets/icons/circle.svg";
import plus_circle from "../../assets/icons/plus_circle.svg";
import setting from "../../assets/icons/setting.svg";

export default function Sidebar({ activeProject }) {
  return (
    <div className="bg-noble-black-700 flex flex-col h-screen w-[312px] p-2">
      {/* ========== Top Section (Org Header) ========== */}
      <div className="bg-noble-black-800 p-8 mb-[1px] rounded-t-2xl flex justify-between items-center">
        {/* Left side: Avatar + Org info */}
        <div className="flex items-center gap-4">
          <img src={Intellisys} alt="Intellisys Avatar" className="w-10 h-10" />
          <div className="flex flex-col">
            <h2 className="text-base font-semibold text-white">Intellisys</h2>
            <p className="text-stem-green-500 text-xs">12 members</p>
          </div>
        </div>
        {/* Right side: Arrow icon */}
        <img
          src={arrow_down}
          alt="arrow_down"
          className="w-2 h-2 text-noble-black-400 cursor-pointer"
        />
      </div>

      {/* ========== General Section ========== */}
      <div className="bg-noble-black-800 px-8 py-4 mb-[1px] ">
        <h3 className="text-noble-black-400 text-xs uppercase mb-3 font-semibold">
          General
        </h3>

        <div className="flex items-center gap-2 mb-3 cursor-pointer hover:text-white">
          <img src={search} alt="Search" className="w-5 h-5" />
          <span className="text-sm text-noble-black-100 font-semibold ml-2 -mt-[3px]">
            Search
          </span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <img src={credit_card} alt="Billing" className="w-5 h-5" />
          <span className="text-sm text-noble-black-100 font-semibold ml-2 -mt-[3px]">
            Billing
          </span>
        </div>
      </div>

      {/* ========== Projects (Scrollable) ========== */}
      <div className="bg-noble-black-800 flex-1 overflow-y-auto px-8 py-4">
        <h3 className="text-noble-black-400 text-xs uppercase mb-3 font-semibold">
          Projects
        </h3>

        {/* Project items */}
        <div
          className={`flex items-center onHover gap-2 px-2 py-2 mb-1 rounded cursor-pointer bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
    backdrop-blur-sm ${activeProject === "Orbital Odyssey" ? "" : ""}`}
        >
          <img
            src={square}
            alt="Square Icon"
            className="
    w-5 h-5 
    shadow-[0_10px_6px_-4px_#B6F09C29,0_5px_3px_-3px_#B6F09C29]"
          />
          <span className="text-sm font-semibold text-noble-black-100 ml-2">
            Orbital Odyssey
          </span>
        </div>
        <div className="flex items-center gap-2 px-2 py-2 mb-1 rounded cursor-pointer onHover">
          <img
            src={triangle}
            alt="Triangle Icon"
            className="w-4 h-4
          shadow-[0_10px_6px_-4px_#BD3B3A29,0_5px_3px_-3px_#BD3B3A29]"
          />
          <span className="text-sm font-semibold text-noble-black-100 ml-2">
            Digital Product Launch
          </span>
        </div>
        <div className="flex items-center gap-2 px-2 py-2 mb-1 rounded cursor-pointer onHover">
          <img
            src={square_orange}
            alt="Square Icon"
            className="w-4 h-4
          shadow-[0_10px_6px_-4px_#E26F2029,0_5px_3px_-3px_#E26F2029]"
          />
          <span className="text-sm font-semibold text-noble-black-100 ml-2">
            Brand Refresh
          </span>
        </div>
        <div className="flex items-center gap-2 px-2 py-2 mb-1 rounded cursor-pointer onHover">
          <img
            src={circle}
            alt="Circle Icon"
            className="w-4 h-4
          shadow-[0_10px_6px_-4px_#82DBF729,0_5px_3px_-3px_#82DBF729]"
          />
          <span className="text-sm font-semibold text-noble-black-100 ml-2">
            Social Media Strategy
          </span>
        </div>

        {/* Add new project */}
        <div className="flex items-center gap-2 mt-4 cursor-pointer text-gray-400 hover:text-white onHover py-2 px-2 -ml-[2px]">
          <img src={plus_circle} alt="Add Icon" className="w-5 h-5" />
          <span className="text-sm font-semibold ml-2">Add new project</span>
        </div>
      </div>

      {/* ========== Footer (User Profile) ========== */}
      <div className="bg-noble-black-800 rounded-b-2xl p-2">
        <div
          className="flex items-center gap-3  bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
    backdrop-blur-sm
     px-8 py-4 rounded-md"
        >
          {/* User Avatar */}
          <div className="relative w-10 h-10">
            {/* Avatar image */}
            <img src={Ryan_Lee} alt="Ryan Lee" className="w-full h-full" />
            {/* Green dot in top-right corner */}
            <div
              className="absolute top-1 right-2 w-2 h-2 bg-[#4ac97e] rounded-full 
                  transform translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_12px_#4AC97E7A]"
            ></div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <p className="font-semibold text-white text-base ">Ryan Lee</p>
            <p className="text-stem-green-500 text-xs font-medium mt-1">
              Premium
            </p>
          </div>

          {/* Settings Icon */}
          <img
            src={setting}
            alt="Settings"
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  /** The currently active project name (e.g., "Orbital Odyssey") */
  activeProject: PropTypes.string,
};

Sidebar.defaultProps = {
  activeProject: "",
};
