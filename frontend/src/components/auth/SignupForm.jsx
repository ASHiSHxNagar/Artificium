// src/components/auth/SignupForm.jsx

import Button from "../shared/Button";
import logo_gradient from "../../assets/icons/logo_gradient.svg";
import register_illustration_1 from "../../assets/images/register_illustration_1.png";

const SignupForm = () => {
  return (
    <div className="grid grid-cols-[60%_40%] bg-bg-nobel-black-700 rounded-2xl w-full min-h-[600px] h-[100vh] overflow-hidden">
      {/* Left Column */}
      <div className="flex flex-col justify-center max-w-full relative">
        {/* Logo */}
        <div className="absolute top-10 left-20 -translate-x-1/2 -translate-y-1/2 w-7 h-7 cursor-pointer">
          <img src={logo_gradient} alt="Logo" />
        </div>

        {/* Login Button */}
        <div className="absolute top-10 right-0 -translate-x-1/2 -translate-y-1/2">
          <Button
            variant="primary"
            className="text-sm bg-clip-text text-transparent cursor-pointer"
            style={{ backgroundImage: "var(--gradient4)" }}
          >
            LogIn
          </Button>
        </div>

        {/* Form Content */}
        <div className="max-w-[500px] max-h-[600px] ml-40 -mt-10">
          <h1 className="text-2xl font-light text-white mb-6">
            Connect with your team and bring your creative ideas to life.
          </h1>

          <form className="space-y-6">
            {/* First + Last Name in one row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-1 text-sm font-light text-nobel-black-200"
                >
                  First name
                </label>
                <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                  <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                    <input
                      id="first_name"
                      type="text"
                      placeholder="First name"
                      className="w-full p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                    />
                  </div>
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-1 text-sm font-light text-nobel-black-200"
                >
                  Last name
                </label>
                <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                  <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                    <input
                      id="last_name"
                      type="text"
                      placeholder="Last name"
                      className="w-full p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Password + Repeat Password in one row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-light text-nobel-black-200"
                >
                  Password
                </label>
                <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                  <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="w-full p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                    />
                  </div>
                </div>
              </div>

              {/* Repeat Password */}
              <div>
                <label
                  htmlFor="repeat_password"
                  className="block mb-1 text-sm font-light text-nobel-black-200"
                >
                  Repeat password
                </label>
                <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                  <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                    <input
                      id="repeat_password"
                      type="password"
                      placeholder="Repeat password"
                      className="w-full p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#82DBF7] bg-transparent border border-[#82DBF7] rounded appearance-none checked:bg-[#000000] checked:before:content-['✔'] checked:before:text-[#82DBF7] checked:before:block checked:before:text-center checked:before:w-full checked:before:h-full checked:before:leading-[0.8rem]"
                />
                <span className="text-nobel-black-200 text-sm ml-2 mr-1 font-light">
                  I agree with
                </span>
                <span className="font-light text-sm bg-gradient-to-r from-[#82DBF7] via-[#82DBF7] to-[#B6F09C] bg-clip-text text-transparent">
                  Terms and Conditions
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button variant="primary" className="w-full bg-[#B6F09C]">
              Create free account
            </Button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-10 left-25 -translate-x-1/2 -translate-y-1/2">
          <span className="text-[12px] font-semibold text-nobel-black-300">
            Artificium.app © 2023
          </span>
        </div>
        <div className="absolute bottom-10 right-0 -translate-x-1/2 -translate-y-1/2">
          <span className="text-[12px] font-semibold text-nobel-black-300">
            Privacy Policy
          </span>
        </div>
      </div>

      {/* Right Column (Illustration) */}
      <div className="flex flex-col justify-center w-full h-full overflow-hidden">
        <img
          src={register_illustration_1}
          alt=""
          className="w-full h-full rounded-2xl object-cover"
        />
      </div>
    </div>
  );
};

export default SignupForm;
