import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import Workspace from "./pages/WorkSpace";
import RequestWorkSpace from "./components/workspace/RequestWorkspace";
import CreateWorkSpace from "./components/workspace/CreateWorkspace";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />

      {/* Workspace Routes */}
      <Route path="workspace" element={<Workspace />}>
        <Route path="requestworkspace" element={<RequestWorkSpace />} />
        <Route path="createworkspace" element={<CreateWorkSpace />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
