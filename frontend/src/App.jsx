import { Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Workspace from "./pages/Workspace";
import RequestWorkSpace from "./components/workspace/RequestWorkspace";
import CreateWorkSpace from "./components/workspace/CreateWorkspace";
import NotFoundPage from "./pages/NotFoundPage";

// Your new pages:
import ArtificiumPage from "./pages/ArtificiumPage";
import ChatPage from "./pages/ChatPage";
import LibraryPage from "./pages/LibraryPage";

const App = () => {
  return (
    <Routes>
      {/* If you want your home page to actually redirect to /artificium: */}
      <Route path="/" element={<Navigate to="/artificium" replace />} />

      {/* Or if you want a real HomePage: 
            <Route path="/" element={<HomePage />} />
        */}

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Workspace routes */}
      <Route path="/workspace" element={<Workspace />}>
        <Route path="requestworkspace" element={<RequestWorkSpace />} />
        <Route path="createworkspace" element={<CreateWorkSpace />} />
      </Route>

      {/* AI pages */}
      <Route path="/artificium" element={<ArtificiumPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/library" element={<LibraryPage />} />

      {/* 404 or NotFound */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
