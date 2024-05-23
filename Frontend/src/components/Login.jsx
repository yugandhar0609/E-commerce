import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS for Toastify

const Login = () => {
  const [login, setLogin] = useState({ userName: "", password: "" });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin((login) => ({ ...login, [name]: value }));
  };

  // Corrected function name: handleOnSubmit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { userName, password } = login;
    if (userName === "") {
      toast.error("Enter the Username or EmailId");
    } else if (password === "") {
      toast.error("Enter the password");
    } else {
      try {
        const response = await axios.post("http://localhost:9955/login", login);
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message); // Corrected the response handling
        }
      } catch (error) {
        // Added safety check for error.response
        toast.error(
          (error.response && error.response.data.message) ||
            "An error occurred. Please try again."
        );
        2;
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3>
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-sm text-purple-700 hover:text-purple-700"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            <form onSubmit={handleOnSubmit}>
              <div className="space-y-6">
                <div className="">
                  <input
                    className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                    type="text"
                    name="userName"
                    value={login.userName}
                    onChange={handleOnChange}
                    placeholder="Username or Email"
                  />
                </div>
                <div className="relative">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={handleOnChange}
                    className="text-sm text-black px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                  />
                  <div className="flex items-center absolute inset-y-0 right-0 mr-3 text-sm leading-5">
                    {/* Password visibility toggle icons */}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm ml-auto">
                    <a
                      href="#"
                      className="text-purple-700 hover:text-purple-600"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
                <div className="flex items-center justify-center space-x-2 my-5">
                  <span className="h-px w-16 bg-gray-100"></span>
                  <span className="text-gray-300 font-normal">or</span>
                  <span className="h-px w-16 bg-gray-100"></span>
                </div>
                <div className="flex justify-center gap-5 w-full ">
                  <button
                    type="button" // Changed to button to avoid submission
                    className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500"
                  >
                    {/* Google icon */}
                    <span>Google</span>
                  </button>
                  <button
                    type="button" // Changed to button to avoid submission
                    className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500 px-"
                  >
                    {/* Facebook icon */}
                    <span>Facebook</span>
                  </button>
                </div>
                <div className="mt-7 text-center text-gray-300 text-xs"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
