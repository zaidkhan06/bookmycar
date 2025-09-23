import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBookings = () => {
  const API_URL = import.meta.env.VITE_API_URL; 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const { data } = await axios.get(`${API_URL}/bookings/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Extract bookings array from backend response
        setBookings(data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading bookings...</p>;

  if (!bookings.length) return <p className="text-center mt-8">No bookings found.</p>;

  return (
    <div className="px-4 md:px-8 max-w-5xl rounded w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">All Bookings</h2>
      <div className="w-full md:w-[700px] xl:w-full overflow-x-auto 2xl:overflow-visible">
        <table className="min-w-[1024px] w-full border bg-white rounded shadow-sm">
          <thead className="bg-blue-100 text-sm text-gray-800">
            <tr>
              <th className="p-2 border">Booking ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Variant</th>
              <th className="p-2 border">Vehicle Reg</th>
              <th className="p-2 border">From - To</th>
              <th className="p-2 border">Total Price</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="text-sm text-gray-700">
                <td className="p-2 border">{b._id}</td>
                <td className="p-2 border">{b.user?.name || "N/A"}</td>
                <td className="p-2 border">{b.variant?.name || "N/A"}</td>
                <td className="p-2 border">{b.vehicleRegNo || "N/A"}</td>
                <td className="p-2 border">
                  {new Date(b.fromDate).toLocaleDateString()} -{" "}
                  {new Date(b.toDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">₹{b.totalPrice}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      b.paymentStatus === "Paid" ? "bg-blue-800" : "bg-gray-500"
                    }`}
                  >
                    {b.paymentStatus}
                  </span>
                </td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      b.status === "Approved"
                        ? "bg-blue-800"
                        : b.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
