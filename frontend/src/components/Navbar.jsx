// src/components/Navbar.jsx
import React, { useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../assets/BMC-logo.png";
import { useAuth } from "../context/AuthContext";
import { Home, User, Mail, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth(); 
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout(); 
    setShowDropdown(false);
    navigate("/"); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-2 sm:px-5 py-4 flex justify-between items-center">
      {/* Left: App Logo and Name */}
      <div
        className="relative flex flex-col items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={Logo}
          alt="BookMyCar Logo"
          className="absolute bottom-3 w-10 sm:h-10 sm:w-16 object-contain"
        />
        <span className="text-sm sm:text-2xl font-bold text-blue-900">
          BookMyCar
        </span>
      </div>

      <div className="space-x-1 sm:space-x-2">
        {!user ? (
          <>
            <button
              onClick={() =>
                navigate("/register", { state: { from: location.pathname } })
              }
              className="text-blue-800 hover:text-blue-700 text-sm sm:text-lg font-medium"
            >
              Register
            </button>
            <button
              onClick={() =>
                navigate("/login", { state: { from: location.pathname } })
              }
              className="text-white bg-blue-800 px-3 py-1 text-md sm:text-lg sm:px-5 rounded-4xl hover:bg-blue-700 transition"
            >
              Login
            </button>
          </>
        ) : (
          <div className="relative">
            {/* Profile Circle */}
            <div ref={profileRef}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer text-white font-bold"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg transition">

                {/* Home */}
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 border-b hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <Home size={16} /> Home
                </Link>

                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 border-b hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <User size={16} /> {user.name}
                </Link>

                {/* Email display */}
                <p className="flex items-center gap-2 px-4 py-2 border-b cursor-default">
                  <Mail size={16} /> {user.email}
                </p>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
