import { FiX } from "react-icons/fi";
import PropTypes from "prop-types";

export default function ShareModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-nobel-black-800 w-full max-w-lg p-6 rounded shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Manage who can view this project
        </h2>
        <p className="text-gray-400 mb-6">
          Select which users can access and view this project. Only users with
          access can view and edit the project.
        </p>

        {/* Example selected users */}
        <div className="mb-4 flex items-center justify-between bg-gray-700 p-3 rounded">
          <div>
            <span className="text-sm text-gray-200 mr-2">Sophia Zhang</span>
            <span className="text-sm text-gray-200 mr-2">Olivia Sharma</span>
          </div>
          <select className="bg-gray-800 text-gray-200 text-sm p-1 rounded">
            <option value="can edit">can edit</option>
            <option value="can view">can view</option>
          </select>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded ml-2">
            Invite
          </button>
        </div>

        {/* Example user list */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
            <span>You @ryan</span>
            <span className="text-sm text-green-400">Owner</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
            <span>Mia Park @cute-mia</span>
            <span className="text-sm text-blue-400">Editor</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
            <span>Isabella Chen @issa</span>
            <span className="text-sm text-blue-400">Editor</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
            <span>Andrew Garcia @garci28</span>
            <span className="text-sm text-purple-400">Viewer</span>
          </div>
        </div>

        {/* Anyone with the link */}
        <div className="bg-gray-700 p-3 rounded flex items-center justify-between">
          <div>
            <p className="font-semibold">Anyone with the link</p>
            <p className="text-gray-400 text-sm">can view</p>
          </div>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded">
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}

// Declare prop types
ShareModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
