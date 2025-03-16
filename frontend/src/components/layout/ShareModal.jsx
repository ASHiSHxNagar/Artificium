import { useState } from "react";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";

// Dummy avatars (replace with real images)
import userAvatar1 from "../../assets/avatar/Adam_Green.png";
import userAvatar2 from "../../assets/avatar/Mia_Park.png";
import userAvatar3 from "../../assets/avatar/Isabella_Chen.png";
import userAvatar4 from "../../assets/avatar/Andrew_Garcia.png";
import userAvatar5 from "../../assets/avatar/Ava_Gupta.png";
import userAvatar6 from "../../assets/avatar/Marcus_Chen.png";
import userAvatar7 from "../../assets/avatar/Lucas_Ortiz.png";
import paper_plane_dark from "../../assets/icons/paper_plane_dark.svg";

// Example icon for “Anyone with the link”
import globeIcon from "../../assets/icons//globe_icon.svg";
import plus_circle from "../../assets/icons/plus_circle.svg";
import attachment_icon from "../../assets/icons/attatchment.svg";

export default function ShareModal({ onClose }) {
  // The role for the invite dropdown
  const [inviteRole, setInviteRole] = useState("can edit");

  // The “chips” of selected users
  const [selectedUsers, setSelectedUsers] = useState([
    {
      id: 101,
      name: "Sophia Zhang",
      username: "@sophia",
      avatar: userAvatar1,
    },
    {
      id: 102,
      name: "Olivia Sharma",
      username: "@olivia",
      avatar: userAvatar2,
    },
  ]);

  // The search term typed in the “Name” field
  const [searchTerm, setSearchTerm] = useState("");

  // Full user list (not in “chips” by default)
  const userList = [
    {
      id: 1,
      name: "Marcus Chen",
      username: "@marc",
      avatar: userAvatar6,
    },
    {
      id: 2,
      name: "Ava Gupta",
      username: "@avvavy",
      avatar: userAvatar5,
    },
    {
      id: 3,
      name: "Lucas Ortiz",
      username: "@luckyluc",
      avatar: userAvatar7,
    },
    {
      id: 4,
      name: "Adam Green",
      username: "@adamg",
      avatar: userAvatar1,
    },
    {
      id: 5,
      name: "Mia Park",
      username: "@cute-mia",
      avatar: userAvatar2,
    },
    {
      id: 6,
      name: "Isabella Chen",
      username: "@issa",
      avatar: userAvatar3,
    },
    {
      id: 7,
      name: "Andrew Garcia",
      username: "@garci28",
      avatar: userAvatar4,
    },
  ];

  // Additional list for “existing” users w/ roles
  // (Owner, Editor, Viewer) – displayed below
  const userListWithRoles = [
    {
      id: 11,
      name: "You",
      username: "@ryan",
      avatar: userAvatar1,
      role: "Owner",
    },
    {
      id: 12,
      name: "Mia Park",
      username: "@cute-mia",
      avatar: userAvatar2,
      role: "Editor",
    },
    {
      id: 13,
      name: "Isabella Chen",
      username: "@issa",
      avatar: userAvatar3,
      role: "Editor",
    },
    {
      id: 14,
      name: "Andrew Garcia",
      username: "@garci28",
      avatar: userAvatar4,
      role: "Viewer",
    },
  ];

  // Filter out any user already in selectedUsers
  // Then filter further by searchTerm (name or username).
  const filteredUsers = userList.filter((user) => {
    // Exclude if user is in selectedUsers
    const isSelected = selectedUsers.some((u) => u.id === user.id);

    // Basic text match
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());

    return !isSelected && matchesSearch;
  });

  // Handle adding a user to the “chips”
  const handleSelectUser = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
    // Clear search after selection
    setSearchTerm("");
  };

  // Handle removing a user from the “chips”
  const handleRemoveUser = (id) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // For demonstration, “Invite” button does nothing special
  const handleInvite = () => {
    console.log("Invite clicked:", selectedUsers, inviteRole);
  };

  return (
    <div className="hidden md:flex fixed inset-0 ] items-center justify-center z-50 backdrop-blur-sm">
      {/* Modal Container */}
      <div
        className="
          relative 
          w-full max-w-[700px] max-h-[600px]
          p-6 rounded-lg
          bg-[#1A1D21F5]
          border-t border-[#FFFFFF14]
          shadow-[inset_0_8px_12px_0_#FFFFFF0A,0_24px_64px_-16px_#0000003D,inset_16px_24px_64px_-24px_#FFFFFF0A]
          backdrop-blur-md
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <FiX size={24} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold text-white mb-2">
          Manage who can view this project
        </h2>
        <p className="text-sm text-noble-black-300 mb-6">
          Select which users can access and view this project. Only users with
          access can view and edit the project.
        </p>

        {/* =========== Row: Input + Role + Invite =========== */}
        {/* ============== Combined Input + Role + Invite ============== */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="
            w-full bg-transparent border-1 border-gray-400
            rounded-lg flex items-center px-3 py-2
             relative max-w-[500px] overflow-x-scroll
          "
          >
            {/* “Chips” + actual text input in one row */}
            <div
              className="
              flex items-center gap-2 overflow-x-scroll 
              scrollbar-hide  /* Hide scrollbar if you want, or style it */
            "
              style={{ maxWidth: "75%" }}
            >
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="
                  flex items-center gap-2 px-2 py-1 rounded-full
                  bg-noble-black-500 min-w-[150px] cursor-pointer
                "
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-xs text-white">{user.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(user.id)}
                    className="text-gray-300 hover:text-gray-100"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}

              {/* The actual text input for searching */}
              <input
                type="text"
                placeholder="Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                flex-shrink-0 bg-transparent text-white
                focus:outline-none
                text-sm
              "
                style={{ minWidth: "6rem" }}
              />
            </div>

            {/* Role dropdown (aligned right) */}
            <select
              className=" cursor-pointer
              ml-auto mr-3 text-[#B6F09C] bg-transparent
              border-none outline-none text-sm
            "
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
            >
              <option value="can edit">can edit</option>
              <option value="can view">can view</option>
            </select>
          </div>

          {/* Invite button */}
          <div className="min-w-[120px]">
            <button
              type="button"
              onClick={handleInvite}
              className=" cursor-pointer
              bg-[#B6F09C] hover:bg-[#9eea88] text-black
              px-4 py-1 rounded-xl flex items-center gap-2 font-semibold 
            "
            >
              Invite
              <img src={paper_plane_dark} alt="" />
            </button>
          </div>
        </div>

        {searchTerm && filteredUsers.length > 0 && (
          <>
            {/* =========== "Users" Section Title =========== */}
            <div className="text-gray-400 text-sm mb-2">Users</div>

            <div
              className="
        relative top-[1%] left-0 mt-1 min-w-fit
        bg-noble-black-800 rounded shadow-lg
        max-h-48 overflow-y-auto mb-4 pl-5 
        z-10
      "
              style={{ minWidth: "12rem" }}
            >
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleSelectUser(user)}
                  className="
            w-full text-left px-3 py-2 hover:bg-noble-black-700
            flex items-center gap-2 cursor-pointer
          "
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm text-white">{user.name}</p>
                    <p className="text-xs text-stem-green-500 font-light">
                      {user.username}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* =========== User List (existing roles) =========== */}
        <div className="max-w-[600px] max-h-[300px] overflow-y-scroll">
          <div className="space-y-3 mb-6 ">
            {userListWithRoles.map((user) => (
              <div
                key={user.id}
                className="
                flex items-center justify-between p-3 rounded-lg
                bg-noble-black-700
              "
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-white">{user.name}</span>
                    <span className="text-xs text-stem-green-500 font-light mt-1">
                      {user.username}
                    </span>
                  </div>
                </div>
                {/* Role badge */}
                <span
                  className="
                  px-3 py-1 text-sm rounded-full
                  bg-noble-black-600 text-gray-300
                "
                >
                  {user.role}
                </span>
              </div>
            ))}

            {/* “and 5 more others” link */}
            <div className="text-noble-black-400 text-sm pl-3 pb-10 flex gap-4 items-center font-semibold">
              <img src={plus_circle} alt="" className="mt-1" />
              and 5 more others
            </div>
          </div>
        </div>

        {/* =========== Footer: Anyone with the link =========== */}
        <div
          className="
            px-4 py-3 rounded-lg flex items-center justify-between
            bg-noble-black-700
            absolute bottom-2 left-0 right-0 mx-6
          "
        >
          <div className="flex items-center gap-3 w-full">
            <img src={globeIcon} alt="Globe" className="w-4 h-4 mt-1" />
            <div className="flex items-center gap-2 justify-between w-full">
              <p className="text-white text-sm font-normal">
                Anyone with the link
              </p>
              <select
                className=" cursor-pointer
              ml-auto mr-5 text-[#B6F09C] bg-transparent
              border-none outline-none text-sm
            "
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
              >
                <option value="can edit">can edit</option>
                <option value="can view">can view</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            className="
              flex items-center gap-2 px-4 py-2 rounded-2xl min-w-[120px]
              bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
              backdrop-blur-sm
              border border-white/20
              text-noble-black-300  font-semibold text-xs cursor-pointer
            "
          >
            <img src={attachment_icon} alt="" />
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}

ShareModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
