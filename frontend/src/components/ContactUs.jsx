import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Mail, Phone, MessageCircle, MapPin } from "lucide-react";

const ContactModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

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
    console.log("Contact form submitted:", formData);
    setSubmitted(true);

    setTimeout(() => {
      navigate(from);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex justify-center items-center">
      <div className="relative bg-white rounded-xl p-6 w-full max-w-70 sm:max-w-sm shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => navigate(from)}
          className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-800 text-center">
          Contact Us
        </h2>

        {submitted ? (
          <p className="text-green-600 text-center font-medium">
            Thank you! We’ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full sm:px-10 px-8 sm:py-2 py-2 border border-gray-300 rounded-md 
                           focus:ring-2 focus:ring-blue-800 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full sm:px-10 px-8 sm:py-2 py-2 border border-gray-300 rounded-md 
                           focus:ring-2 focus:ring-blue-800 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[6-9]{1}[0-9]{9}"
                maxLength="10"
                className="w-full sm:px-10 px-8 sm:py-2 py-2 border border-gray-300 rounded-md 
                           focus:ring-2 focus:ring-blue-800 focus:outline-none"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <MessageCircle
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <textarea
                name="message"
                required
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full sm:px-10 px-8 sm:py-2 py-2 border border-gray-300 rounded-md 
                           focus:ring-2 focus:ring-blue-800 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        )}

        {/* Static Contact Info */}
        <div className="mt-6 text-gray-600 text-sm space-y-2">
          <div className="flex items-center justify-center gap-2">
            <MapPin size={16} className="text-blue-800" /> 
            <span>Indore, Madhya Pradesh</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail size={16} className="text-blue-800" /> 
            <span>support@bookmycar.com</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone size={16} className="text-blue-800" /> 
            <span>+91 98765 43220</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
