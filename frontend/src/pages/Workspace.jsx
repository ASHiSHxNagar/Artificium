import Button from "../components/shared/Button";
import logo_gradient from "../assets/icons/logo_gradient.svg";
import register_illustration_1 from "../assets/images/register_illustration_1.png";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Workspace = () => {
  const location = useLocation();
  const isNestedRoute =
    location.pathname.includes("/workspace/requestworkspace") ||
    location.pathname.includes("/workspace/createworkspace");

  const [workspace, setWorkspace] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\s+/g, "-"); // Prevent spaces, replace with hyphen
    setWorkspace(value);
  };

  return (
    <div className="w-full min-h-screen mx-auto overflow-hidden">
      {/* Show workspace layout only when on /workspace (not subroutes) */}
      {!isNestedRoute && (
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] bg-bg-nobel-black-700 rounded-2xl w-full min-h-screen">
          {/* Left Column */}
          <div className="relative p-12 flex flex-col justify-between h-full min-h-[600px]">
            {/* Header Section */}
            <div className="flex justify-between items-start">
              <img
                src={logo_gradient}
                alt="Logo"
                className="w-7 h-7 cursor-pointer"
              />
              <Button
                variant="primary"
                className=" cursor-pointer text-sm bg-gradient-to-r from-[#B6F09C] to-[#58E0F2] bg-clip-text text-transparent"
              >
                LogIn
              </Button>
            </div>

            {/* Main Content */}
            <div className="max-w-[550px] mx-auto w-full">
              <h1 className="text-2xl font-light text-white mb-3">
                Join or Create a Workspace
              </h1>

              <p className="text-nobel-black-300 text-sm mb-8">
                Connect with others by joining an existing workspace or create a
                new one to collaborate with your team.
              </p>

              <form className="space-y-6">
                {/* Workspace URL Input */}
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={workspace}
                      onChange={handleChange}
                      placeholder="Your workspace URL"
                      className="w-full bg-nobel-black-600 text-white px-4 py-2 rounded-md pr-32 focus:outline-none placeholder:text-nobel-black-400 font-medium"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-nobel-black-300 text-sm">
                      .artificium.app
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    className="text-black hover:opacity-90 rounded-md bg-[#B6F09C] cursor-pointer text-[14px]"
                  >
                    Join Workspace
                  </Button>
                </div>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-[#363A3D]"></div>
                  <span className="flex-shrink mx-4 text-nobel-black-300 text-sm">
                    or
                  </span>
                  <div className="flex-grow border-t border-[#363A3D]"></div>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-nobel-black-600 text-white hover:bg-nobel-black-500 cursor-pointer border-none"
                >
                  Create new Workspace
                </Button>
              </form>
            </div>

            {/* Footer */}
            <div className="flex justify-between text-nobel-black-300 text-xs">
              <span>Artificium.app © 2023</span>
              <span>Privacy Policy</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center w-full h-full overflow-hidden">
            <img
              src={register_illustration_1}
              alt=""
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
        </div>
      )}

      {/* Renders Request/CreateWorkspace Components when route matches */}
      {isNestedRoute && (
        <div className="w-full h-full">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Workspace;
