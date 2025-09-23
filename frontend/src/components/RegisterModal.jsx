// src/components/RegisterModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const RegisterModal = ({ onRegister }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    drivingLicence: null,
    aadhaar: null,
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // jaha se user aaya tha wahi save karlo
  const from = location.state?.from || "/";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleFileValidation = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      alert("File size should be less than 10MB");
      e.target.value = "";
      return;
    }
    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("password", formData.password);
      data.append("drivingLicence", formData.drivingLicence);
      data.append("aadhaar", formData.aadhaar);

      const res = await axios.post(
        `${API_URL}/auth/register`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Store in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Call callback to update Navbar immediately
      if (onRegister) onRegister(res.data.user);

      alert("✅ Registration Successful!");
      navigate(from); // success ke baad wapas wahi
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.msg || "Registration failed");
      alert("❌ Registration Failed!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex justify-center items-center">
      <div className="relative text-center bg-white rounded-xl p-6 w-full max-w-70 sm:max-w-sm shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => navigate(from)} // ❌ pe sidha wahi route
          className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-800">Register</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full sm:px-4 px-1 sm:py-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Enter a valid email address"
            className="w-full sm:px-4 px-1 sm:py-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            pattern="[6-9]{1}[0-9]{9}"
            maxLength="10"
            title="Enter a valid 10-digit Indian mobile number"
            className="w-full sm:px-4 px-1 sm:py-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            pattern="(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}"
            title="Must be at least 8 characters, include one uppercase letter, and one number"
            className="w-full sm:px-4 px-1 sm:py-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />

          {/* Driving Licence Upload */}
          <div className="text-left">
            <label className="block mb-1 font-medium text-gray-700">
              Upload Driving Licence
            </label>
            <input
              type="file"
              name="drivingLicence"
              required
              accept=".jpg,.jpeg,.png,.heif,.pdf,image/*,application/pdf"
              onChange={handleFileValidation}
              className="w-full sm:px-4 px-1 sm:py-2 py-1 border border-gray-300 rounded-md
                file:mr-3 file:px-3 file:py-1 file:border-0
                file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          {/* Aadhar Card Upload */}
          <div className="text-left mt-4">
            <label className="block mb-1 font-medium text-gray-700">
              Upload Aadhaar Card
            </label>
            <input
              type="file"
              name="aadhaar"
              required
              accept=".jpg,.jpeg,.png,.heif,.pdf,image/*,application/pdf"
              onChange={handleFileValidation}
              className="w-full sm:px-4 px-1 sm:py-2 py-1 border border-gray-300 rounded-md
                file:mr-3 file:px-3 file:py-1 file:border-0
                file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>

          <Link className="text-blue-700" to="/login" state={{ from }}>
           <span className="text-black"> Already registered?</span> Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
