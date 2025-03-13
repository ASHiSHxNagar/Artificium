import Button from "../shared/Button";
import logo_gradient from "../../assets/icons/logo_gradient.svg";
import register_illustration_2 from "../../assets/images/register_illustration_2.png";

import Marcus_Chen from "../../assets/avatar/Marcus_Chen.png";
import Lily_Patel from "../../assets/avatar/Lily_Patel.png";
import Harper_Singh from "../../assets/avatar/Harper_Singh.png";
import David_Singh from "../../assets/avatar/David_Singh.png";
import Ava_Gupta from "../../assets/avatar/Ava_Gupta.png";
import Adam_green from "../../assets/avatar/Adam_Green.png";
import Vertexia from "../../assets/avatar/Vertexia.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_SERVER_DOMAIN;
// e.g. "http://localhost:4000"

const JoinWorkspace = () => {
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceSlug, setWorkspaceSlug] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Retrieve workspaceId from sessionStorage
    const wsId = sessionStorage.getItem("workspaceId");
    const wsSlug = sessionStorage.getItem("workspaceSlug");
    if (!wsId || !wsSlug) {
      toast.error("No workspace found in session. Please pick a workspace again.");
      navigate("/workspace");
      return;
    }
    fetchWorkspace(wsId, wsSlug);
  }, []);


  const fetchWorkspace = async (wsId, wsSlug) => {
    try {
      const { data } = await axios.get(`${API_BASE}/workspaces/${wsId}`);
      if (data.success && data.workspace) {
        setWorkspaceName(data.workspace.name);
        setWorkspaceSlug(wsSlug);
      } else {
        toast.error("Workspace not found. Please try again.");
        navigate("/workspace");
      }
    } catch (err) {
      console.error("Error fetching workspace:", err);
      toast.error("Failed to fetch workspace data.");
      navigate("/workspace");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinNow = () => {
    // If we have a slug, navigate to /artificium/:slug
    if (!workspaceSlug) {
      toast.error("Workspace slug not found. Try again.");
      navigate("/workspace");
      return;
    }
    navigate(`/artificium/${workspaceSlug}`);
  };

  const handleChangeWorkspace = () => {
    navigate("/workspace");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Loading workspace...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="grid grid-cols-[60%_40%] bg-bg-noble-black-700 rounded-2xl w-full min-h-[600px] h-[100vh] overflow-hidden">
        {/* Left Column */}
        <div className="flex flex-col justify-center items-center max-w-full relative">
          {/* Logo */}
          <div className="absolute top-10 left-10 w-7 h-7 cursor-pointer">
            <img src={logo_gradient} alt="Logo" />
          </div>

          <div className="flex flex-col items-center gap-6 max-w-[550px] px-10">
            {/* “Vertexia” Header Section */}
            <div className="flex flex-col items-center gap-2">
              <img
                src={Vertexia}
                alt="avatar 7"
                className="w-20 h-20 rounded-full"
              />
              <h1 className="font-bold text-4xl text-white mt-4">
                {workspaceName}
              </h1>
              <p className="text-base text-stem-green-500 font-light mb-4">
                {workspaceSlug.toLowerCase()}.artificium.app
              </p>
            </div>

            {/* Workspace Input + Button */}
            <div className="flex items-center justify-center w-full space-x-4 mb-4">
              <h1
                className="text-base text-noble-black-400 font-semibold cursor-pointer"
                onClick={handleChangeWorkspace}
              >
                Change workspace
              </h1>
              <Button
                variant="primary"
                className="text-black hover:opacity-90 rounded-md bg-[#B6F09C] cursor-pointer text-sm font-semibold"
                onClick={handleJoinNow}
              >
                Join Now
              </Button>
            </div>

            {/* Avatar Stack + Text */}
            <div className="flex items-center">
              {/* Overlapping Avatars */}
              <div className="flex -space-x-3">
                <img
                  src={Marcus_Chen}
                  className="w-10 h-10 rounded-full border-2 border-noble-black-700"
                  alt="avatar 1"
                />
                <img
                  src={Lily_Patel}
                  className="w-10 h-10 rounded-full border-2 border-noble-black-700"
                  alt="avatar 2"
                />
                <img
                  src={Harper_Singh}
                  className="w-10 h-10 rounded-full border-2 border-noble-black-700"
                  alt="avatar 3"
                />
                <img
                  src={David_Singh}
                  className="w-10 h-10 rounded-full border-2 border-noble-black-700"
                  alt="avatar 4"
                />
                <img
                  src={Ava_Gupta}
                  className="w-10 h-10 rounded-full border-2 border-noble-black-700"
                  alt="avatar 5"
                />
                <img
                  src={Adam_green}
                  className="w-10 h-10 rounded-full border-2 border-noble-black-700"
                  alt="avatar 6"
                />
              </div>
              {/* Text */}
              <h2 className="ml-4 text-noble-black-300 text-sm font-medium">
                and 873 others have already joined
              </h2>
            </div>
          </div>

          {/* Footer Links */}
          <div className="absolute bottom-10 left-10">
            <span className="text-xs font-semibold text-noble-black-300">
              Artificium.app © 2023
            </span>
          </div>
          <div className="absolute bottom-10 right-10">
            <span className="text-xs font-semibold text-noble-black-300">
              Privacy Policy
            </span>
          </div>
        </div>

        {/* Right Column (Illustration) */}
        <div className="flex flex-col justify-center w-full h-full overflow-hidden">
          <img
            src={register_illustration_2}
            alt=""
            className="w-full h-full rounded-2xl object-cover scale-[1.1]"
          />
        </div>
      </div>
    </>
  );
};

export default JoinWorkspace;
