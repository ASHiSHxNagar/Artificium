import { useState } from "react";
import PropTypes from "prop-types";

export default function AddChatModal({ onClose, onAddChat }) {
  const [chatName, setChatName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatName.trim()) {
      setError("Chat name is required");
      return;
    }
    onAddChat(chatName);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-noble-black-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-xl font-semibold mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="chatName" className="block text-gray-400 mb-2">
              Chat Name
            </label>
            <input
              type="text"
              id="chatName"
              value={chatName}
              onChange={(e) => {
                setChatName(e.target.value);
                setError(null);
              }}
              className="w-full p-2 rounded bg-noble-black-700 text-white border border-gray-600 focus:outline-none focus:border-stem-green-500"
              placeholder="Enter chat name"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-noble-black-600 text-gray-400 rounded hover:bg-noble-black-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-stem-green-500 text-white rounded hover:bg-stem-green-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddChatModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddChat: PropTypes.func.isRequired,
};