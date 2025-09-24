import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, UploadCloud } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const UserProfile = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState({ drivingLicence: false, aadhaar: false });
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Fetch bookings for logged-in user
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?._id) return;
      try {
        setLoadingBookings(true);
        const { data } = await axios.get(`${API_URL}/bookings/user/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        
        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err.response?.data || err);
        setBookings([]); // fallback
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (!user) return <div className="text-center mt-20 text-gray-600">Loading...</div>;

  const { name, email, phone } = user;

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  const handleReupload = async (docType, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading((prev) => ({ ...prev, [docType]: true }));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.patch(
        `${API_URL}/auth/user/upload/${docType}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      updateUser(data.user);
      alert(`${docType} uploaded successfully!`);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err);
      alert(err.response?.data?.msg || "Upload failed. Try again.");
    } finally {
      setLoading((prev) => ({ ...prev, [docType]: false }));
    }
  };

  return (
    <div className="w-full bg-white max-w-6xl mx-auto mt-20 shadow-xl rounded-xl px-6 sm:px-10 py-8 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center text-2xl font-bold">
          {getInitial(name)}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600 break-words">{email}</p>
          <p className="text-gray-600 break-words">+91-{phone}</p>
        </div>
      </div>

      <hr className="text-gray-300" />

      {/* Documents Section */}
      <div className="space-y-6">
        {["drivingLicence", "aadhaar"].map((doc) => (
          <div key={doc} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{doc === "drivingLicence" ? "Driving Licence" : "Aadhaar Card"}</p>
              <p className="text-sm text-gray-500 truncate max-w-xs">{user[doc]?.filename}</p>
            </div>
            <div className="flex items-center gap-2">
              {user[doc]?.status === "Approved" ? (
                <CheckCircle className="text-green-500 h-6 w-6" />
              ) : user[doc]?.status === "Rejected" ? (
                <>
                  <label className="flex items-center gap-1 text-blue-700 text-sm hover:underline cursor-pointer">
                    {loading[doc] ? "Uploading..." : "Re-upload"}
                    <UploadCloud className="text-blue-800 h-5 w-5" />
                    <input type="file" className="hidden" onChange={(e) => handleReupload(doc, e)} />
                  </label>
                  <XCircle className="text-red-500 h-6 w-6" />
                </>
              ) : (
                <p className="text-gray-500 text-sm">Pending...</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <hr className="text-gray-300" />

      {/* Booking History */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-center">Booking History</h3>
        {loadingBookings ? (
          <p className="text-gray-500 text-sm text-center">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <div
                key={booking._id || index}
                className="shadow-sm rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
              >
                <p className="text-base font-medium text-blue-800">
                  {booking.variant?.company} {booking.variant?.name}
                </p>
                <p className="text-sm text-gray-600">
                  From: {new Date(booking.fromDate).toLocaleDateString()} - To:{" "}
                  {new Date(booking.toDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Total: ₹{booking.totalPrice}</p>
                <p className="text-sm text-gray-500">Status: {booking.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
