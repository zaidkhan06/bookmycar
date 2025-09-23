import React, { useState, useEffect } from "react";
import axios from "axios";

const AddVariants = () => {
   const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    type: "",
    price: "",
    seating: "",
    ac: "",
    image: null,
    imagePreview: null,
  });

  const [variants, setVariants] = useState([]);

  // 🔹 Fetch all variants on load
  useEffect(() => {
    fetchVariants();
  }, []);

  const fetchVariants = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/variants`);
      setVariants(data);
    } catch (err) {
      console.error("Error fetching variants:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type: inputType, files } = e.target;

    if (inputType === "file") {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: imageUrl,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.image) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("company", formData.company);
    data.append("type", formData.type);
    data.append("price", formData.price);
    data.append("seating", formData.seating);
    data.append("ac", formData.ac);
    data.append("image", formData.image);

    try {
      await axios.post(`${API_URL}/variants/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchVariants(); // refresh list after add

      // Clear form
      setFormData({
        name: "",
        company: "",
        type: "",
        price: "",
        seating: "",
        ac: "",
        image: null,
        imagePreview: null,
      });
    } catch (err) {
      console.error("Error adding variant:", err);
    }
  };

  return (
    <div className="px-4 md:px-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Add Car Variant</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Variant Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
          >
            <option value="">Select Type</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Mini">Mini</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price / day"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <input
            type="number"
            name="seating"
            placeholder="Seating Capacity"
            value={formData.seating}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <select
            name="ac"
            value={formData.ac}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
          >
            <option value="">AC Condition</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>

          {/* Image Upload */}
          <div className="flex flex-col gap-2 col-span-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            {formData.imagePreview ? (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="h-24 w-full object-cover rounded border"
              />
            ) : (
              <div className="h-24 w-full bg-gray-100 border rounded flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Variant
          </button>
        </div>
      </form>

      {/* Variants List */}
      {variants.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Variants List</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variants.map((v, i) => (
              <div key={i} className="border rounded p-4 bg-white shadow-sm">
                <img
                  src={`${API_URL.replace("/api","")}${v.image}`}
                  alt={v.name}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{v.name}</h3>
                <p className="text-gray-600">{v.company}</p>
                <p className="text-gray-500 text-sm">
                  {v.type} | {v.seating} Seater | {v.ac}
                </p>
                <p className="text-blue-800 font-bold mt-1">₹{v.price}/day</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVariants;
