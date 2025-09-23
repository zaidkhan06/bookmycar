import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";

const AdminCustomers = () => {
  
 const API_URL = import.meta.env.VITE_API_URL;
  const [customers, setCustomers] = useState([]);
  const [showDoc, setShowDoc] = useState({ open: false, url: "", type: "" });

  const token = localStorage.getItem("token"); // Admin JWT token

  // Fetch all users
  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/auth/admin/customers`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCustomers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Update document status
  const handleDocStatusChange = async (userId, docType, status) => {
    try {
      const { data } = await axios.patch(
        `${API_URL}/auth/admin/customers/${userId}/verify`,
        { docType, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state
      setCustomers((prev) =>
        prev.map((c) => (c._id === userId ? data.user : c))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update document status");
    }
  };

  return (
    <div className="px-4 md:px-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">All Customers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border bg-white rounded shadow-sm">
          <thead className="bg-blue-100 text-sm text-gray-800">
            <tr>
              <th className="p-2 border w-40">Name</th>
              <th className="p-2 border w-52">Email</th>
              <th className="p-2 border w-32">Phone</th>
              <th className="p-2 border w-48">Aadhaar</th>
              <th className="p-2 border w-48">DL</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust._id} className="text-sm text-gray-700">
                <td className="p-2 border truncate">{cust.name}</td>
                <td className="p-2 border truncate">{cust.email}</td>
                <td className="p-2 border truncate">{cust.phone}</td>

                {/* Aadhaar */}
                <td className="p-2 border">
                  <button
                    onClick={() =>
                      setShowDoc({
                        open: true,
                        url: cust.aadhaar.path,
                        type: "Aadhaar",
                      })
                    }
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                  <div className="mt-1">
                    {cust.aadhaar.status === "Approved" ? (
                      <span className="text-green-600 text-xs flex items-center gap-1">
                        <CheckCircle size={14} /> Approved
                      </span>
                    ) : cust.aadhaar.status === "Rejected" ? (
                      <span className="text-red-600 text-xs flex items-center gap-1">
                        <XCircle size={14} /> Rejected
                      </span>
                    ) : (
                      <div className="space-x-1">
                        <button
                          onClick={() =>
                            handleDocStatusChange(
                              cust._id,
                              "aadhaar",
                              "Approved"
                            )
                          }
                          className="bg-blue-800 text-white px-2 py-0.5 text-xs rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleDocStatusChange(
                              cust._id,
                              "aadhaar",
                              "Rejected"
                            )
                          }
                          className="bg-red-500 text-white px-2 py-0.5 text-xs rounded"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>

                {/* Driving Licence */}
                <td className="p-2 border">
                  <button
                    onClick={() =>
                      setShowDoc({
                        open: true,
                        url: cust.drivingLicence.path,
                        type: "Driving Licence",
                      })
                    }
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                  <div className="mt-1">
                    {cust.drivingLicence.status === "Approved" ? (
                      <span className="text-green-600 text-xs flex items-center gap-1">
                        <CheckCircle size={14} /> Approved
                      </span>
                    ) : cust.drivingLicence.status === "Rejected" ? (
                      <span className="text-red-600 text-xs flex items-center gap-1">
                        <XCircle size={14} /> Rejected
                      </span>
                    ) : (
                      <div className="space-x-1">
                        <button
                          onClick={() =>
                            handleDocStatusChange(
                              cust._id,
                              "drivingLicence",
                              "Approved"
                            )
                          }
                          className="bg-blue-800 text-white px-2 py-0.5 text-xs rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleDocStatusChange(
                              cust._id,
                              "drivingLicence",
                              "Rejected"
                            )
                          }
                          className="bg-red-500 text-white px-2 py-0.5 text-xs rounded"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Document Preview Popup */}
      {/* Document Preview Popup */}
     {showDoc.open && (
  <div className="fixed inset-0 flex items-center justify-center bg-[#F3F4F6] bg-opacity-60 z-50 p-4">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl h-full max-h-[90vh] relative overflow-auto">
      <h3 className="text-2xl font-semibold mb-4">{showDoc.type} Preview</h3>

      {showDoc.url ? (
        (() => {
          const isImage = showDoc.url.match(/\.(jpeg|jpg|png|gif)$/i);
          const isPDF = showDoc.url.match(/\.pdf$/i);

          if (isImage) {
            return (
              <img
                src={`${API_URL}/${showDoc.url}`}
                alt="Document"
                className="w-full h-auto rounded border"
              />
            );
          } else if (isPDF) {
            return (
              <iframe
                src={`${API_URL}/${showDoc.url}`}
                className="w-full h-[80vh] rounded border"
              />
            );
          } else {
            return (
              <p className="text-red-500">Cannot preview this file type.</p>
            );
          }
        })()
      ) : (
        <p className="text-gray-500">No document uploaded.</p>
      )}

      <button
        onClick={() => setShowDoc({ open: false, url: "", type: "" })}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
      >
        ✕
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default AdminCustomers;
