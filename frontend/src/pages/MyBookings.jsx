import React from "react";
import Dzire from "../assets/Dzire.png";
import generateInvoice from "../utils/generateInvoice";

import {
  CarFront,
  BadgeIndianRupee,
  CalendarClock,
  CalendarRange,
  User,
  Hash,
  FileText,
  ShieldCheck,
  Download,
  XCircle,
} from "lucide-react";

const mockBookings = [
  {
    id: "BK123456",
    customer: "Zaid Khan",
    carVariant: "Hyundai Creta SX",
    image: Dzire,
    totalDays: 4,
    price: 7200,
    fromDate: "2025-08-01",
    toDate: "2025-08-05",
    bookingTime: "2025-07-28 14:30",
    paymentStatus: "Success",
    approvalStatus: "Approved",
    status: "Upcoming",
  },
  {
    id: "BK123457",
    customer: "Zaid Khan",
    carVariant: "Maruti Dzire VXI",
    image: Dzire,
    totalDays: 2,
    price: 3200,
    fromDate: "2025-07-20",
    toDate: "2025-07-22",
    bookingTime: "2025-07-18 10:00",
    paymentStatus: "Success",
    approvalStatus: "Approved",
    status: "Completed",
  },
  {
    id: "BK123458",
    customer: "Zaid Khan",
    carVariant: "Honda City ZX",
    image: Dzire,
    totalDays: 3,
    price: 5400,
    fromDate: "2025-07-25",
    toDate: "2025-07-28",
    bookingTime: "2025-07-24 12:45",
    paymentStatus: "Failed",
    approvalStatus: "Rejected",
    status: "Cancelled",
  },
];

const MyBookings = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("Upcoming");

  const filteredBookings = mockBookings.filter(
    (booking) => booking.status === selectedFilter
  );

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 space-y-6">
      <h1 className="sm:text-2xl text-md font-bold mb-4 text-gray-800">
        My Bookings
      </h1>

      {/* Filter Tabs */}
      <div className="flex sm:gap-4 gap-2 mb-6 text-[10px] sm:text-sm">
        {["Upcoming", "Completed", "Cancelled"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-2 py-2 rounded-full transition ${
              selectedFilter === filter
                ? "bg-blue-800 text-white"
                : "bg-gray-200 hover:bg-blue-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      {filteredBookings.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No {selectedFilter} bookings found.
        </p>
      ) : (
        filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-6 items-start"
          >
            {/* Car Image */}
            <img
              src={booking.image}
              alt={booking.carVariant}
              className="w-full md:w-52 h-32 object-cover rounded"
            />

            {/* Booking Info + Actions */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 flex-wrap w-full">
              {/* Left: Details */}
              <div className="flex-1 space-y-2 text-sm text-gray-800">
                <p className="flex items-center gap-2 font-semibold text-base">
                  <CarFront className="w-4 h-4 text-blue-800" />
                  {booking.carVariant}
                </p>
                <p className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  Booking ID: {booking.id}
                </p>
                <p className="flex items-center gap-2">
                  <BadgeIndianRupee className="w-4 h-4 text-gray-500" />
                  Total Days: {booking.totalDays} | ₹{booking.price}
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  Customer: {booking.customer}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-gray-500" />
                  Booking Time: {booking.bookingTime}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarRange className="w-4 h-4 text-gray-500" />
                  {booking.fromDate} → {booking.toDate}
                </p>
                <p className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Payment Status:{" "}
                  <span
                    className={`font-medium ${
                      booking.paymentStatus === "Success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gray-500" />
                  Admin Status:{" "}
                  <span
                    className={`font-medium ${
                      booking.approvalStatus === "Approved"
                        ? "text-green-600"
                        : booking.approvalStatus === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {booking.approvalStatus}
                  </span>
                </p>
              </div>

              {/* Right: Actions */}
              <div className="sm:self-start  justify-center flex flex-row gap-2">
                <button className="px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-md bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={() => generateInvoice(booking)}
                  className="px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-md bg-blue-800 text-white rounded hover:bg-blue-700 transition flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Invoice
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
