import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Trash2, Plus, X } from "lucide-react";


const Variants = () => {
  
 const API_URL = import.meta.env.VITE_API_URL;
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [regNo, setRegNo] = useState("");

  // ✅ Fetch variants from backend
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/variants`);
        setVariants(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVariants();
  }, []);

  const handleView = (variant) => {
    setSelectedVariant(variant);
    setRegNo("");
  };

  const handleClose = () => {
    setSelectedVariant(null);
    setRegNo("");
  };

  // ✅ Add vehicle via API
  const handleAddRegNo = async () => {
    if (!regNo.trim()) return;
    try {
      const { data } = await axios.post(
        `${API_URL}/variants/${selectedVariant._id}/vehicles`,
        { regNo: regNo.trim() }
      );
      setVariants(variants.map(v => v._id === data._id ? data : v));
      setSelectedVariant(data);
      setRegNo("");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // ✅ Delete vehicle via API
  const handleDeleteRegNo = async (reg) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/variants/${selectedVariant._id}/vehicles/${reg}`
      );
      setVariants(variants.map(v => v._id === data._id ? data : v));
      setSelectedVariant(data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="px-4 md:px-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">All Variants</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Company</th>
              <th className="p-3">Price</th>
              <th className="p-3">Vehicles</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant._id} className="border-t">
                <td className="p-3">
                  <img
                    src={`${API_URL.replace("/api","")}${variant.image}`}
                    alt={variant.name}
                    className="h-12 w-20 object-cover rounded"
                  />
                </td>
                <td className="p-3">{variant.name}</td>
                <td className="p-3">{variant.company}</td>
                <td className="p-3">₹{variant.price}/day</td>
                <td className="p-3">{variant.vehicles?.length || 0}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleView(variant)}
                    className="bg-blue-800 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center gap-1"
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vehicle Popup */}
      {selectedVariant && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-start pt-20 ml-64 z-50">
          <div className="bg-white rounded-lg w-full max-w-5xl p-6 relative shadow-lg">
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X size={24} />
            </button>
            <div className="flex gap-6">
               
              <img src={`${API_URL.replace("/api","")}${selectedVariant.image}`}
                alt={selectedVariant.name}
                className="w-40 h-28 object-cover rounded" />
              <div>
                <h3 className="text-xl font-semibold">{selectedVariant.name}</h3>
                <p className="text-gray-600">{selectedVariant.company}</p>
                <p className="text-sm">AC: {selectedVariant.ac ? "Yes" : "No"}</p>
                <p className="text-sm">Seating: {selectedVariant.seating}</p>
                <p className="text-sm">Color: {selectedVariant.color}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input
                type="text"
                placeholder="Enter Registration No"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                onClick={handleAddRegNo}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                <Plus size={16} className="inline" /> Add
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Registered Vehicles:</h4>
              <table className="w-full text-left border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">#</th>
                    <th className="p-2">Registration No</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedVariant.vehicles?.map((reg, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2">{reg}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDeleteRegNo(reg)}
                          className="text-red-600 hover:underline flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!selectedVariant.vehicles || selectedVariant.vehicles.length === 0) && (
                    <tr>
                      <td colSpan="3" className="p-2 text-center text-gray-500">
                        No vehicles added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Variants;
