import Button from "../shared/Button";
import logo_gradient from "../../assets/icons/logo_gradient.svg";
import register_illustration_2 from "../../assets/images/register_illustration_2.png";

import Marcus_Chen from "../../assets/avatar/Marcus_Chen.png";
import Lily_Patel from "../../assets/avatar/Lily_Patel.png";
import Harper_Singh from "../../assets/avatar/Harper_Singh.png";
import David_Singh from "../../assets/avatar/David_Singh.png";
import Ava_Gupta from "../../assets/avatar/Ava_Gupta.png";
import Adam_green from "../../assets/avatar/Adam_Green.png";

import { useNavigate } from "react-router-dom";

const RequestWorkspace = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-[60%_40%] bg-bg-noble-black-700 rounded-2xl w-full min-h-[600px] h-[100vh] overflow-hidden">
      {/* Left Column */}
      <div className="flex flex-col justify-center items-center max-w-full relative">
        {/* Logo */}
        <div className="absolute top-10 left-20 -translate-x-1/2 -translate-y-1/2 w-7 h-7 cursor-pointer">
          <img src={logo_gradient} alt="Logo" />
        </div>

        <div className="flex flex-col items-center gap-4 max-w-[500px] px-20">
          {/* Avatar Stack */}
          <div className="flex -space-x-3 relative group">
            <img
              src={Marcus_Chen}
              className="w-12 h-12 rounded-full border-2 border-noble-black-700"
              alt="avatar 1"
            />
            <img
              src={Lily_Patel}
              className="w-12 h-12 rounded-full border-2 border-noble-black-700"
              alt="avatar 2"
            />
            <img
              src={Harper_Singh}
              className="w-12 h-12 rounded-full border-2 border-noble-black-700"
              alt="avatar 3"
            />
            <img
              src={David_Singh}
              className="w-12 h-12 rounded-full border-2 border-noble-black-700"
              alt="avatar 4"
            />
            <img
              src={Ava_Gupta}
              className="w-12 h-12 rounded-full border-2 border-noble-black-700"
              alt="avatar 5"
            />
            <img
              src={Adam_green}
              className="w-12 h-12 rounded-full border-2 border-noble-black-700"
              alt="avatar 6"
            />
          </div>
          <div>
            <h1 className="text-2xl font-light text-white mt-4 text-center">
              Sophia, Kamil, Emily and 2,012 others are already here!
            </h1>
          </div>
          <div>
            <p className="text-sm text-noble-black-300 font-extralight mt-1 mb-4 text-center text-wrap">
              {/* eslint-disable-next-line */}
              But... it looks like you don't have access <br />
              to this workspace.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <Button
              variant="primary"
              className="w-fit bg-[#B6F09C] cursor-pointer font-bold "
              onClick={() => navigate("/workspace/joinworkspace")}
            >
              Access request
            </Button>
            <span className="text-sm text-noble-black-400 font-medium text-center">
              or
            </span>
            <Button
              variant="outline"
              className="w-fit  text-xs font-bold bg-noble-black-600 text-noble-black-300 outline-none border-0 cursor-pointer"
            >
              Back
            </Button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-10 left-25 -translate-x-1/2 -translate-y-1/2">
          <span className="text-[12px] font-semibold text-noble-black-300">
            Artificium.app © 2023
          </span>
        </div>
        <div className="absolute bottom-10 right-0 -translate-x-1/2 -translate-y-1/2">
          <span className="text-[12px] font-semibold text-noble-black-300">
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
  );
};

export default RequestWorkspace;
