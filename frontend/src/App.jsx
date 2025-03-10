import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Workspace from "./pages/Workspace";
import RequestWorkSpace from "./components/workspace/RequestWorkspace";
import CreateWorkSpace from "./components/workspace/CreateWorkspace";
import NotFoundPage from "./pages/NotFoundPage";
import ArtificiumPage from "./pages/ArtificiumPage";
import ChatPage from "./pages/ChatPage";
import LibraryPage from "./pages/LibraryPage";
import ShareModal from "./components/layout/ShareModal";

function App() {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleOpenShare = () => {
    setShowShareModal(true);
  };

  const handleCloseShare = () => {
    setShowShareModal(false);
  };

  return (
    <Router>
      <div className="flex h-screen w-full bg-noble-black-700 text-gray-200">
        <Routes>
          <Route path="/" element={<Navigate to="/artificium" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/workspace" element={<Workspace />}>
            <Route path="requestworkspace" element={<RequestWorkSpace />} />
            <Route path="createworkspace" element={<CreateWorkSpace />} />
          </Route>
          <Route
            path="/artificium"
            element={<ArtificiumPage onShareClick={handleOpenShare} />}
          />
          <Route
            path="/chat"
            element={<ChatPage onShareClick={handleOpenShare} />}
          />
          <Route
            path="/library"
            element={<LibraryPage onShareClick={handleOpenShare} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {showShareModal && <ShareModal onClose={handleCloseShare} />}
      </div>
    </Router>
  );
}

export default App;
