import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth(); 

  // Scroll control for modal
  useEffect(() => {
    document.body.style.overflow = "hidden"; // modal open -> scroll off
    return () => {
      document.body.style.overflow = "auto"; // modal close -> scroll on
    };
  }, []);

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/"); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      
      login(data.user, data.token);

      if (onClose) onClose(); // modal close
      navigate("/search"); // redirect after login
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex justify-center items-center">
      <div className="relative bg-white rounded-xl p-6 w-full max-w-70 text-center sm:max-w-sm shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-800">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

          <Link
            className="text-blue-700"
            to="/register"
            state={{ from: location.state?.from || "/" }}
          >
            <span className="text-black">Don’t have an account?</span> Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
