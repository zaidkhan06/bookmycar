import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Car, Users, Snowflake, PaintBucket } from "lucide-react";

const BookingPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car; // must be fetched from backend with _id

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const user = JSON.parse(localStorage.getItem("user")); // logged-in user

  // Redirect if car info or user missing
  useEffect(() => {
    if (!car || !user) navigate("/search");
  }, [car, user, navigate]);

  // Calculate total days & price
  useEffect(() => {
    if (fromDate && toDate && car) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(days > 0 ? days : 0);
      setTotalPrice(days > 0 ? days * car.price : 0);
    }
  }, [fromDate, toDate, car]);

  if (!car || !user) return null;

  const handleProceedPayment = () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates");
      return;
    }

    // ✅ Send only variant._id to backend along with other details
    navigate("/payment", {
      state: {
        variant: {
          _id: car._id,  // important! must exist
          name: car.name,
          company: car.company,
          price: car.price,
        },
        fromDate,
        toDate,
        totalPrice,
      },
    });
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-100 px-4 sm:px-10">
      <div className="bg-white p-5 rounded-lg shadow-md flex flex-col md:flex-row gap-6">
        {/* Left: Car Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
             src={`${API_URL.replace("/api","")}${car.image}`}
            alt={car.name}
            className="w-full max-w-sm rounded-lg object-cover"
          />
        </div>

        {/* Right: Car Info + Booking Form */}
        <div className="md:w-1/2 space-y-4">
          <h3 className="text-xl font-semibold text-blue-800">
            {car.company} {car.name}
          </h3>

          {/* Car Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center gap-3">
              <PaintBucket className="text-blue-800" size={20} />
              <span><strong>Color:</strong> {car.color}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-blue-800" size={20} />
              <span><strong>Seating:</strong> {car.seating}</span>
            </div>
            <div className="flex items-center gap-3">
              <Snowflake className="text-blue-800" size={20} />
              <span><strong>AC:</strong> {car.ac}</span>
            </div>
            <div className="flex items-center gap-3">
              <Car className="text-blue-800" size={20} />
              <span><strong>Per Day:</strong> ₹{car.price}</span>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2 mt-6">
            <label className="block font-medium">From Date:</label>
            <input
              type="date"
              min={minDate}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />
            <label className="block font-medium">To Date:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Price Calculation */}
          <div className="mt-4 text-blue-800 font-semibold">
            Total Days: {totalDays} <br />
            Total Price: ₹{totalPrice}
          </div>

          {/* Proceed to Payment Button */}
          <button
            onClick={handleProceedPayment}
            className="mt-4 w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
