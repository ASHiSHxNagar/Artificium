// src/components/auth/RegisterForm.jsx
import Button from "../shared/Button";
import logo_gradient from "../../assets/icons/logo_gradient.svg";
import register_illustration_1 from "../../assets/images/register_illustration_1.png";
import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { storeInSession } from "../shared/Session";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    repeat_password: "",
    terms: false,
  });
  // let success;
  const navigate = useNavigate();
const API_BASE = import.meta.env.VITE_SERVER_DOMAIN;


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.repeat_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE}/users/register`,
        {
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        }
      );
      storeInSession("token", response.data.token);

      toast.success("Registration successful!");
      window.location.href = "/workspace"; // Redirect to /workspace after successful registration
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[60%_40%] bg-bg-noble-black-700 rounded-2xl w-full min-h-[600px] h-[100vh] overflow-hidden">
      <Toaster />
      {/* Left Column */}
      <div className="flex flex-col justify-center max-w-full relative">
        {/* Logo */}
        <div
          className="absolutetop-10 left-10 lg:left-20 -translate-x-1/2 -translate-y-1/2 w-7 h-7 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo_gradient} alt="Logo" />
        </div>

        {/* Login Button */}
        <div className="absolute top-10 right-0 -translate-x-1/2 -translate-y-1/2">
          <Button
            variant="primary"
            className="text-sm bg-clip-text text-transparent cursor-pointer"
            style={{ backgroundImage: "var(--gradient4)" }}
            onClick={() => navigate("/login")}
          >
            LogIn
          </Button>
        </div>

        {/* Form Content */}
        <div className="max-w-[500px] max-h-[600px] mt-10  ml-10 lg:ml-40 mr-10 lg:mr-10">
          <h1 className="text-base md:text-xl lg:text-2xl font-light text-white mb-6">
            Connect with your team and bring your creative ideas to life.
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="block mb-1 text-sm font-light text-noble-black-200"
              >
                Full name
              </label>
              <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="Full name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-light text-noble-black-200"
              >
                Email
              </label>
              <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                  />
                </div>
              </div>
            </div>

            {/* Password + Repeat Password in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-light text-noble-black-200"
                >
                  Password
                </label>
                <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                  <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 bg-transparent text-xs text-white font-bold outline-none caret-[#82DBF7]"
                    />
                  </div>
                </div>
              </div>

              {/* Repeat Password */}
              <div>
                <label
                  htmlFor="repeat_password"
                  className="block mb-1 text-sm font-light text-noble-black-200"
                >
                  Repeat password
                </label>
                <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                  <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                    <input
                      id="repeat_password"
                      name="repeat_password"
                      type="password"
                      placeholder="Repeat password"
                      value={formData.repeat_password}
                      onChange={handleChange}
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
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#82DBF7] bg-transparent border border-[#82DBF7] rounded appearance-none checked:bg-[#000000] checked:before:content-['✔'] checked:before:text-[#82DBF7] checked:before:block checked:before:text-center checked:before:w-full checked:before:h-full checked:before:leading-[0.8rem]"
                />
                <span className="text-noble-black-200 text-xs md:text-sm ml-2 mr-1 font-light">
                  I agree with
                </span>
                <span className="font-light text-xs md:-text-sm bg-gradient-to-r from-[#82DBF7] via-[#82DBF7] to-[#B6F09C] bg-clip-text text-transparent">
                  Terms and Conditions
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              variant="primary"
              className="w-full bg-[#B6F09C] cursor-pointer"
            >
              Create free account
            </Button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-0 md:bottom-7 lg:bottom-5 left-25 -translate-x-1/2 -translate-y-1/2">
          <span className="text-[12px] font-semibold text-noble-black-300">
            Artificium.app © 2023
          </span>
        </div>
        <div className="absolute bottom-0 md:bottom-7 lg:bottom-5 right-0 -translate-x-1/2 -translate-y-1/2">
          <span className="text-[12px] font-semibold text-noble-black-300">
            Privacy Policy
          </span>
        </div>
      </div>

      {/* Right Column (Illustration) */}
      <div className="hidden md:flex flex-col justify-center w-full h-full overflow-hidden">
        <img
          src={register_illustration_1}
          alt=""
          className="w-full h-full rounded-2xl object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
