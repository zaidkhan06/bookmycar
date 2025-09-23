import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white py-8 px-4">
      {/* Main Links Section */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
        <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
          <Link to="/privacy-policy" className="hover:text-blue-300 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-blue-300 transition-colors">
            Terms of Service
          </Link>
          <Link to="/contact-us" className="hover:text-blue-300 transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Admin Links */}
        <div className="flex gap-4 text-sm text-gray-300 hover:text-gray-100 transition-colors">
          <Link to="/admin/login">Admin Login</Link>
           <Link to="/admin/register">Admin Register</Link> 
        </div>
      </div>

      {/* Copyright */}
      <p className="mt-6 text-center text-gray-400 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} BookMyCar. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
