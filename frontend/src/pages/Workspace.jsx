import { useState , useEffect} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import Button from "../components/shared/Button";
import logo_gradient from "../assets/icons/logo_gradient.svg";
import register_illustration_1 from "../assets/images/register_illustration_1.png";
import { lookInSession,storeInSession } from "../components/shared/Session";

const API_BASE = import.meta.env.VITE_SERVER_DOMAIN;
// e.g. "http://localhost:3000"

const WorkspacePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = lookInSession("token");
  const [user,setUser]=useState(null);
  const [workspace, setWorkspace] = useState("");
  const [workspaceId, setWorkspaceId] = useState(null);
  const [workspaceSlug, setWorkspaceSlug] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try { 
        const userInfo = await axios.get(`${API_BASE}/users/getme`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
        console.log("User info:", userInfo.data);
        setUser(userInfo.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
        // Don't show error toast on initial load, just clear the token if invalid
        if (err.response?.status === 401) {
          sessionStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [token]);
  // Detect if we are in nested route
  const isNestedRoute =
    location.pathname.includes("/workspace/requestworkspace") ||
    location.pathname.includes("/workspace/joinworkspace");

  const validateWorkspaceName = (originalName) => {
    // 1. Replace consecutive whitespace (\s+) with a single space
    const compressed = originalName.replace(/\s+/g, " ");
    const name = compressed.trim();

    // Check length
    if (name.length < 3) {
      toast.error("Workspace name must be at least 3 characters.");
      return false;
    }
    const regex = /^[a-zA-Z0-9_\- ]+$/;

    if (!regex.test(name)) {
      toast.error(
        "Workspace name can only contain letters, numbers, single spaces, hyphens, and underscores."
      );
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    // Replace spaces with hyphen
    const value = e.target.value.replace(/\s+/g, " ");
    setWorkspace(value);
  };


  // 1) Join Workspace
// frontend/src/pages/WorkspacePage.jsx
const handleJoinWorkspace = async () => {
  if (!validateWorkspaceName(workspace)) {
    return;
  }

  try {
    // Get the token from sessionStorage
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to join a workspace.");
      navigate("/login");
      return;
    }

    // Check if the name is valid (exists for joining)
    const { data: checkData } = await axios.get(`${API_BASE}/workspaces/name/${encodeURIComponent(workspace)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (checkData.success) {
      setWorkspaceId(checkData.workspaceId);
      setWorkspaceSlug(checkData.slug);

      storeInSession("workspaceId", checkData.workspaceId);
      storeInSession("workspaceSlug", checkData.slug);

      navigate("/workspace/requestworkspace");
    } else {
      toast.error(checkData.message || "Failed to join workspace.");
    }
  } catch (err) {
    console.error("Join workspace error:", err);
    if (err.response?.status === 404) {
      toast.error(
        err.response.data.message || "No workspace with that name. Please check spelling."
      );
    } else if (err.response?.status === 401) {
      toast.error("Unauthorized. Please log in again.");
    } else if (err.response?.status === 500) {
      toast.error("Failed to check workspace. Please try again.");
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
};

// ... (rest of the file remains the same)

  // 2) Create New Workspace
// frontend/src/pages/WorkspacePage.jsx
const handleCreateWorkspace = async () => {
  if (!validateWorkspaceName(workspace)) {
    return;
  }

  try {
    // Create new workspace in DB
    const token = sessionStorage.getItem("token");

    const { data } = await axios.post(
      `${API_BASE}/workspaces`,
      { workspaceName: workspace },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.success) {
      setWorkspaceId(data.workspace._id);
      setWorkspaceSlug(data.workspace.slug);

      storeInSession("workspaceId", data.workspace._id);
      storeInSession("workspaceSlug", data.workspace.slug);

      toast.success("Workspace created successfully!");

      navigate(`/workspace/joinworkspace`);
    } else {
      toast.error(data.message || "Could not create workspace. Try again.");
    }
  } catch (err) {
    console.error(err);
    if (
      err.response?.data?.message ===
      "A workspace with this name already exists. Try joining it."
    ) {
      toast.error("A workspace with this name already exists. Try joining it.");
    } else {
      toast.error("Error creating workspace. Please try again.");
    }
  }
};

  return (
    <>
      <Toaster />
      <div className="w-full min-h-screen mx-auto overflow-hidden">
        {/* Show workspace layout only if not subroute */}
        {!isNestedRoute && (
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] bg-bg-noble-black-700 rounded-2xl w-full min-h-screen">
            {/* Left Column */}
            <div className="relative p-12 flex flex-col justify-between h-full min-h-[600px]">
              {/* Header Section */}
              <div className="flex justify-between items-start">
                <img
                  src={logo_gradient}
                  alt="Logo"
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => navigate("/")}
                />
                {loading ? (
                  <div className="text-sm text-noble-black-300">Loading...</div>
                ) : user && user.username ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm bg-gradient-to-r from-[#B6F09C] to-[#58E0F2] bg-clip-text text-transparent">
                      {user.username}
                    </span>
                    {user.profile_img && (
                      <img
                        src={user.profile_img}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    className="cursor-pointer text-sm bg-gradient-to-r from-[#B6F09C] to-[#58E0F2] bg-clip-text text-transparent"
                    onClick={() => navigate("/login")}
                  >
                    Log In 
                  </Button>
                )}
              </div>

              {/* Main Content */}
              <div className="max-w-[550px] mx-auto w-full">
                <h1 className="text-2xl font-light text-white mb-3">
                  Join or Create a Workspace
                </h1>
                <p className="text-noble-black-300 text-sm mb-8">
                  Connect with others by joining an existing workspace or create
                  a new one to collaborate with your team.
                </p>

                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()} // prevent page refresh
                >
                  {/* Workspace URL Input */}
                  <div className="grid grid-cols-1 gap-7 md:gap-0 md:grid-cols-[70%_30%] items-center space-x-4">
                    <div className="relative grid grid-cols-[80%_20%] bg-noble-black-600">
                      <input
                        type="text"
                        value={workspace}   
                        onChange={handleChange}
                        placeholder="Your workspace URL"
                        className="w-full bg-noble-black-600 text-white px-4 py-2 rounded-md focus:outline-none placeholder:text-noble-black-400 font-medium text-[8px] sm:text-sm md:text-base"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-noble-black-300 text-[8px] sm:text-sm md:text-base">
                        .artificium.app
                      </span>
                    </div>
                    <Button
                      variant="primary"
                      className="text-black hover:opacity-90 rounded-md bg-[#B6F09C] cursor-pointer text-[14px]"
                      onClick={handleJoinWorkspace}
                    >
                      Join Workspace
                    </Button>
                  </div>

                  <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-[#363A3D]" />
                    <span className="flex-shrink mx-4 text-noble-black-300 text-sm">
                      or
                    </span>
                    <div className="flex-grow border-t border-[#363A3D]" />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-noble-black-600 text-white hover:bg-noble-black-500 cursor-pointer border-none text-xs sm:text-sm md:text-base"
                    onClick={handleCreateWorkspace}
                  >
                    Create new Workspace
                  </Button>
                </form>
              </div>

              {/* Footer */}
              <div className="flex justify-between text-noble-black-300 text-xs">
                <span>Artificium.app © 2023</span>
                <span>Privacy Policy</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="hidden md:flex flex-col justify-center w-full h-full overflow-hidden">
              <img
                src={register_illustration_1}
                alt=""
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
          </div>
        )}

        {/* Renders Request/joinWorkspace Components when route matches */}
        {isNestedRoute && (
          <div className="w-full h-full">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};

export default WorkspacePage;
