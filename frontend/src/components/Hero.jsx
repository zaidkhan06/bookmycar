import React, { useEffect, useState, useContext } from 'react';
import heroBg from '../assets/blob-scene-haikei.png';
import { ArrowRight, ChevronsDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function Hero({ scrollToSearch }) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth; 
  const currentUser = user || JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Button click handler
  const handleBookNow = () => {
    if (currentUser) {
      navigate("/search");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#DCD5FB] overflow-hidden">
      <img
        src={heroBg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover rounded-b-4xl"
      />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-800">
          Welcome to <span className="text-blue-800">BookMyCar</span>
        </h1>
        <p className="mt-1 text-sm md:text-xl">
          Find, Rent, and Drive Your Dream Car
        </p>
        <button
          onClick={handleBookNow} 
          className="mt-6 rounded-full flex items-center gap-1 bg-blue-800 text-white px-3 py-2 shadow-md hover:bg-blue-700 transition duration-300"
        >
          Book Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Scroll Down Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-36 md:bottom-20 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-blue-800">
          <ChevronsDown size={32} />
        </div>
      )}
    </div>
  );
}

export default Hero;
