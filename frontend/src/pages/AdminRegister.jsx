import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AdminRegisterModal = ({ onRegister }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/admin/register`, formData);
      
      // Store token and admin info
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      if (onRegister) onRegister(res.data.admin);
      alert("Admin Registration Successful!");
      navigate("/admin/newregister");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.msg || "Registration failed");
      alert("Registration Failed!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center p-4">
      <div className="relative bg-white rounded-xl p-6 w-full max-w-sm shadow-xl text-center">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-900">Register Admin</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>

          <Link className="text-gray-500 text-sm" to="/admin/login">
            Already registered? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterModal;
