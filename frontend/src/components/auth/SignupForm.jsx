// src/components/auth/LoginForm.jsx
import Button from "../shared/Button";

import logo_gradient from "../../assets/icons/logo_gradient.svg";
import register_illustration_1 from "../../assets/images/register_illustration_1.png";

const SignupForm = () => {
  return (
    <>
      <div className="grid grid-cols-[60%_40%] bg-bg-nobel-black-700 rounded-2xl w-full  min-h-[600px] h-[100vh]  overflow-hidden">
        {/* Left Column */}
        <div className="flex flex-col justify-center max-w-full relative ">
          <div className="absolute top-10 left-20 -translate-x-1/2 -translate-y-1/2 w-7 h-7">
            <img src={logo_gradient} alt="Logo" />
          </div>
          <div className="absolute top-10 right-0 -translate-x-1/2 -translate-y-1/2 ">
            <Button
              variant="primary"
              className=" text-sm bg-clip-text text-transparent cursor-pointer"
              style={{ backgroundImage: "var(--gradient4)" }}
            >
              LogIn
            </Button>
          </div>
          <div className=" max-w-[500px] max-h-[600px] ml-40 -mt-10 ">
            <div className="flex items-center">
              <h1 className="text-2xl font-light text-white">
                Connect with your team and bring your creative ideas to life.
              </h1>
            </div>

            <form className="space-y-4">
              <div className="relative w-full rounded-lg transition-all">
                <div className="relative w-full flex items-center  rounded-lg">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="text-sm text-nobel-black-300 font-normal mb-2 "
                    >
                      First name
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      placeholder="First name "
                      className="w-full p-2 rounded-lg border border-[#363A3D] bg-[#1A1D21] transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="text-sm text-nobel-black-300 font-normal mb-2 "
                    >
                      Last name
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      placeholder="Last name "
                      className="w-full pl-10 p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                    />
                  </div>
                </div>
              </div>

              <div className="relative w-full rounded-lg transition-all">
                <div className="relative w-full flex items-center  rounded-lg">
                  <div>
                    <label
                      htmlFor="last-name"
                      className="text-sm text-nobel-black-300 font-normal mb-2 "
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="w-full pl-10 p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="text-sm text-nobel-black-300 font-normal mb-2 "
                    >
                      Repeat password
                    </label>
                    <input
                      id="repeat-password"
                      type="password"
                      placeholder="Repeat Password"
                      className="w-full pl-10 p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#82DBF7] bg-transparent border border-[#82DBF7] rounded appearance-none checked:bg-[#000000] checked:before:content-['✔'] checked:before:text-[#82DBF7] checked:before:block checked:before:text-center checked:before:w-full checked:before:h-full checked:before:leading-[0.8rem]"
                  />
                  <span className="text-nobel-black-200 text-sm ml-2 mr-1 font-light">
                    i agree with
                  </span>
                  <span
                    href="#"
                    className=" font-light text-sm bg-gradient-to-r from-[#82DBF7] via-[#82DBF7] to-[#B6F09C] bg-clip-text text-transparent"
                  >
                    Terms and Conditions
                  </span>
                </label>
              </div>

              <Button variant="primary" className="w-full bg-[#B6F09C]">
                Create free account
              </Button>
            </form>
          </div>
          <div className="absolute bottom-10 left-25  -translate-x-1/2 -translate-y-1/2">
            <span className="text-[12px] font-semibold text-nobel-black-300 ">
              Artificium.app © 2023
            </span>
          </div>
          <div className="absolute bottom-10 right-0 -translate-x-1/2 -translate-y-1/2">
            <span className="text-[12px] font-semibold text-nobel-black-300">
              Privacy Policy
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full h-full overflow-hidden ">
          <img
            src={register_illustration_1}
            alt=""
            className="w-full h-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default SignupForm;
