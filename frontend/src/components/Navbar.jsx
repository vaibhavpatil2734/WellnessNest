import React, { useState } from "react";
import Hamburger from "hamburger-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import NavLink from "../components/NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const navLinkStyles = (path) =>
    `text-white hover:text-purple-400 ${
      location.pathname === path ? "underline decoration-red-500" : ""
    }`;

  return (
    <div className="w-full bg-gray-900 text-gray-200 shadow-lg animate-slideInFromTop">
      {/* Navbar */}
      <div className="w-full h-20 flex items-center justify-between px-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">WellnessNext</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className={navLinkStyles("/")}>
            Dashboard
          </Link>
          <Link to="/Features" className={navLinkStyles("/Features")}>
            Capabilities
          </Link>
          <Link to="/AboutUs" className={navLinkStyles("/AboutUs")}>
            Our Story
          </Link>
          <Link to="/ContactUs" className={navLinkStyles("/ContactUs")}>
            Connect
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="border border-gray-500 rounded-md focus:outline-none"
          >
            <Hamburger toggled={isMenu} toggle={toggleMenu} color="#FFFFFF" />
          </button>
        </div>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!isAuthenticated ? (
            <>
              <Link to="/SignIn" className="text-lg text-gray-400 hover:text-purple-400">
                Login
              </Link>
              <Link to="/Register" className="text-lg text-gray-400 hover:text-purple-400">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <span
                className="cursor-pointer flex items-center gap-2 text-gray-400 hover:text-purple-400"
                onClick={toggleDropdown}
              >
                {user?.name || "User"}
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
              {isDropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
                  <Link
                    to="/profile/update-profile"
                    className="block px-4 py-2 text-gray-400 hover:bg-gray-700"
                    onClick={() => setIsDropdownVisible(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownVisible(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-700"
                  >
                    <FiLogOut size={20} className="inline mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenu && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col md:hidden gap-4 p-4 bg-gray-800"
          >
            <Link to="/" onClick={toggleMenu} className={navLinkStyles("/")}>
              Dashboard
            </Link>
            <Link to="/Features" onClick={toggleMenu} className={navLinkStyles("/Features")}>
              Capabilities
            </Link>
            <Link to="/AboutUs" onClick={toggleMenu} className={navLinkStyles("/AboutUs")}>
              Our Story
            </Link>
            <Link to="/ContactUs" onClick={toggleMenu} className={navLinkStyles("/ContactUs")}>
              Connect
            </Link>
            {!isAuthenticated ? (
              <>
                <Link
                  to="/SignIn"
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-purple-400"
                >
                  Login
                </Link>
                <Link
                  to="/Register"
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-purple-400"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <span
                  className="cursor-pointer flex items-center gap-2 text-gray-400 hover:text-purple-400"
                  onClick={toggleDropdown}
                >
                  {user?.name || "User"}
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
                {isDropdownVisible && (
                  <div className="mt-2 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50">
                    <Link
                      to="/profile/update-profile"
                      onClick={() => setIsDropdownVisible(false)}
                      className="block px-4 py-2 text-gray-400 hover:bg-gray-600"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownVisible(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-600"
                    >
                      <FiLogOut size={20} className="inline mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Navbar;
