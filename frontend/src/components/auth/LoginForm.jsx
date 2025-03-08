// src/components/auth/LoginForm.jsx
import Button from "../shared/Button";
import GoogleIcon from "../../assets/icons/googlelogo.svg";
import AppleIcon from "../../assets/icons/applelogo.svg";
import mail1_icon from "../../assets/icons/mail1_icon.svg";
import lock_icon from "../../assets/icons/lock_icon.svg";
import logo_gradient from "../../assets/icons/logo_gradient.svg";
import login_illustrator_1 from "../../assets/images/login_Illustration_1.png";
import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { authWithGoogle } from "../shared/Firebase";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  let success;
  const navigate = useNavigate();

  const handleGoogleAuth = (e) => {
    e.preventDefault();

    authWithGoogle()
      .then(async (user) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_DOMAIN}/google-auth`,
            {
              access_token: user.accessToken,
            }
          );
          toast.success(response.data.message);
          success = true; // Replace with actual login success condition

          if (success) {
            navigate("/workspace"); // Redirect without reloading the page
          }
        } catch (error) {
          toast.error(error.response?.data?.error || "An error occurred");
        }
      })
      .catch((err) => {
        toast.error("trouble signing in with google");
        return console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // this means for all input fields except checkbox, the value will be set to the value of the input field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      toast.success(response.data.message);
      success = true;
      if (success) {
        navigate("/workspace"); // Redirect without reloading the page
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <>
      <div className="grid grid-cols-[50%_50%] bg-bg-noble-black-700 rounded-2xl w-full  min-h-[600px] h-[100vh]  overflow-hidden">
        <Toaster />
        {/* Left Column */}
        <div className="flex flex-col justify-center max-w-[700px] ">
          <div
            className="absolute top-10 left-20 -translate-x-1/2 -translate-y-1/2 w-7 h-7 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo_gradient} alt="Logo" />
          </div>
          <div className=" max-w-[400px] max-h-[600px] ml-40 ">
            <div className="flex items-center">
              <h1 className="text-2xl font-light text-white">
                {/* eslint-disable-next-line */}
                Let's get
              </h1>
              <h1 className="text-2xl font-bold ml-2 bg-gradient-to-r from-[#4D62E5] via-[#87DDEE] to-[#B6F09C] bg-clip-text text-transparent">
                creative!
              </h1>
            </div>
            <p className="text-sm text-noble-black-300 font-extralight mt-3 mb-12">
              Log in to Artificium to start creating magic.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                  <img
                    src={mail1_icon}
                    alt=""
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                  />
                </div>
              </div>

              <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                  <img
                    src={lock_icon}
                    alt=""
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-10">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#82DBF7] bg-transparent border border-[#82DBF7] rounded appearance-none checked:bg-[#000000] checked:before:content-['✔'] checked:before:text-[#82DBF7] checked:before:block checked:before:text-center checked:before:w-full checked:before:h-full checked:before:leading-[0.8rem]"
                  />
                  <span className="text-noble-black-200 text-sm">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className=" font-bold text-sm bg-gradient-to-r from-[#4D62E5] via-[#87DDEE] to-[#B6F09C] bg-clip-text text-transparent"
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                variant="primary"
                className="w-full bg-[#B6F09C] cursor-pointer"
              >
                Log in
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#363A3D]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-xs  text-noble-black-400 bg-noble-black-700">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="w-full bg-noble-black-600  text-noble-black-400 text-xs outline-none border-0 cursor-pointer"
                  onClick={handleGoogleAuth}
                >
                  <img
                    src={GoogleIcon}
                    alt="Google"
                    className="w-5 h-5 mr-2 "
                  />
                  Google Account
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-noble-black-600  text-noble-black-400 text-xs outline-none border-0 cursor-pointer"
                >
                  <img src={AppleIcon} alt="Apple" className="w-5 h-5 mr-2 " />
                  Apple Account
                </Button>
              </div>

              <div className="absolute bottom left-30 mt-5 ">
                <p className="mt-8 text-center text-gray-600 text-sm  text-noble-black-400">
                  {/* eslint-disable-next-line */}
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className=" text-sm ml-2 font-semibold  bg-gradient-to-r from-[#4D62E5] via-[#87DDEE] to-[#B6F09C] bg-clip-text text-transparent"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full  h-full overflow-hidden ">
          <img
            src={login_illustrator_1}
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
