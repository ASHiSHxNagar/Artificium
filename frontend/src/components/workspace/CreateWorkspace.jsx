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

const CreateWorkspace = () => {
  return (
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
            <h1 className="font-bold text-4xl text-white mt-4">Vertexia</h1>
            <p className="text-base text-stem-green-500 font-light mb-4">
              vertexia.artficium.app
            </p>
          </div>

          {/* Workspace Input + Button */}
          <div className="flex items-center justify-center w-full space-x-4 mb-4">
            <h1 className="text-base text-noble-black-400 font-semibold cursor-pointer">
              Change workspace
            </h1>
            <Button
              variant="primary"
              className="text-black hover:opacity-90 rounded-md bg-[#B6F09C] cursor-pointer text-sm font-semibold"
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
  );
};

export default CreateWorkspace;
