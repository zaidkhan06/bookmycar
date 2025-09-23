import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";


const FilterSidebar = ({ onClose, filters, setFilters, allCompanies = [], isOpen }) => {
  const [localFilters, setLocalFilters] = useState({ ...filters });

  useEffect(() => {
    setLocalFilters({ ...filters });
  }, [filters]);

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      priceRange: [0, 10000],
      ac: [],
      seatingCapacity: [],
      company: [],
      sortBy: "",
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    onClose();
  };

  const toggleArrayFilter = (key, value) => {
    const current = localFilters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setLocalFilters((prev) => ({
      ...prev,
      [key]: updated,
    }));
  };

  const handleSortChange = (e) => {
    setLocalFilters((prev) => ({
      ...prev,
      sortBy: e.target.value,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0  bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 p-4 overflow-y-auto shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-black text-xl"> <X className="sm:w-7 sm:h-7 w-6 h-6" /></button>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block font-medium mb-2 text-gray-700">Price Range (₹)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={localFilters.priceRange[0]}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      priceRange: [Number(e.target.value), prev.priceRange[1]],
                    }))
                  }
                  className="w-1/2 border border-gray-400 px-2 py-1 rounded focus:outline-none text-gray-700"
                />
                <span>to</span>
                <input
                  type="number"
                  value={localFilters.priceRange[1]}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number(e.target.value)],
                    }))
                  }
                  className="w-1/2 border border-gray-400 px-2 py-1 rounded focus:outline-none text-gray-700"
                />
              </div>
            </div>

            {/* AC */}
            <div className="mb-4">
              <label className="block font-medium mb-2 text-gray-700 ">AC Condition</label>
              {["AC", "Non-AC"].map((condition) => (
                <label
                  key={condition}
                  className={`block ${
                    localFilters.ac.includes(condition)
                      ? "text-gray-700"
                      : "text-gray-500"
                  }`}
                >
                   <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={localFilters.ac.includes(condition)}
                    onChange={() => toggleArrayFilter("ac", condition)}
                    className="mr-2  w-5 h-5"
                  />
                   {condition}
                  </div>
                 
                </label>
              ))}
            </div>

            {/* Seating Capacity */}
            <div className="mb-4">
              <label className="block font-medium mb-2 text-gray-700">Seating Capacity</label>
              {[4, 5, 6, 7, 8].map((capacity) => (
                <label
                  key={capacity}
                  className={`block ${
                    localFilters.seatingCapacity.includes(capacity)
                      ? "text-gray-700"
                      : "text-gray-500"
                  }`}
                >
                  <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={localFilters.seatingCapacity.includes(capacity)}
                    onChange={() => toggleArrayFilter("seatingCapacity", capacity)}
                    className="mr-2  w-5 h-5"
                  />
                  {capacity} Seater
                  </div>
                </label>
              ))}
            </div>

            {/* Company */}
            <div className="mb-4">
              <label className="block font-medium mb-2 text-gray-700">Company</label>
              {allCompanies?.map((company, index) => (
                <label
                  key={index}
                  className={`block ${
                    localFilters.company.includes(company)
                      ? "text-gray-700"
                      : "text-gray-500"
                  }`}
                >
                  <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={localFilters.company.includes(company)}
                    onChange={() => toggleArrayFilter("company", company)}
                    className="mr-2  w-5 h-5"
                  />
                  {company}
                  </div>
                </label>
              ))}
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <label className="block font-medium mb-2 text-gray-700">Sort By</label>
              <select
                value={localFilters.sortBy}
                onChange={handleSortChange}
                className="w-full border border-gray-400 px-2 py-1 rounded focus:outline-none text-gray-700"
              >
                <option value="">None</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-full"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;
