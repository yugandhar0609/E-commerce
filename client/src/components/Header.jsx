import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import NavBar from "./NavBar";
import { MdClose, MdMenu } from "react-icons/md";
import { FaOpencart, FaUserCircle } from "react-icons/fa";
import axios from "axios"; // Import Axios

const Header = () => {
  const [mobileopen, setMobileopen] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Use Axios to fetch user data
    axios
      .get("http://localhost:9955/user", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const toggleMenu = () => {
    setMobileopen(!mobileopen);
  };

  return (
    <div className="text-tertiary  backdrop-blur-lg fixed top-0 w-full ring-1 ring-slate-900/5 z-10">
      <div className="px-4 flex items-center justify-between py-4 max-xs:px-2">
        <div className="flex sm:justify-start flex-grow sm:flex-grow-0">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="logo" height={35} width={35} />
            <span className="font-bold mt-2">Black White</span>
          </Link>
        </div>
        <NavBar
          containerStyles={`hidden md:flex gap-x-5 xl:gap-x-10 medium-15`}
        />
        <NavBar
          containerStyles={`${
            mobileopen
              ? "flex item-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
              : "flex item-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"
          }`}
        />
        <div className="flex items-center gap-x-2 sm:hidden">
          <Link to="/" className="flex relative">
            <FaOpencart className="p-1 h-8 w-8 ring-1 rounded-full ring-slate-900/30" />
            <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-2">
              1
            </span>
          </Link>
          {user ? (
            <div className="relative">
              <img
                src={user.picture}
                alt={user.name}
                className="h-8 w-8 rounded-full cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <FaUserCircle className="h-8 w-8 cursor-pointer" />
            </Link>
          )}
          {!mobileopen ? (
            <MdMenu
              className="cursor-pointer hover:text-secondary ml-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full"
              onClick={toggleMenu}
            />
          ) : (
            <MdClose
              className="cursor-pointer hover:text-secondary ml-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full"
              onClick={toggleMenu}
            />
          )}
        </div>
        <div className="hidden sm:flex items-center gap-x-2">
          <Link to="/" className="flex relative">
            <FaOpencart className="p-1 h-8 w-8 ring-1 rounded-full ring-slate-900/30" />
            <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-2">
              1
            </span>
          </Link>
          {user ? (
            <div className="relative">
              <img
                src={user.picture}
                alt={user.name}
                className="h-8 w-8 rounded-full cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <FaUserCircle className="h-8 w-8 cursor-pointer" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
