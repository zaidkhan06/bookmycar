import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import axios from "axios";
import FilterSidebar from "./FilterSidebar.jsx";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const navigate = useNavigate();
  const queryParam = useQuery().get("query") || "";
  const categoryParam = useQuery().get("category") || "All";
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [committedSearchTerm, setCommittedSearchTerm] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Vehicle availability state
  const [availability, setAvailability] = useState({}); 

  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    ac: [],
    seatingCapacity: [],
    company: [],
    sortBy: "",
  });

  const categories = ["All", "SUV", "Sedan", "Hatchback", "Luxury"];

  useEffect(() => {
    setSearchTerm(queryParam);
    setCommittedSearchTerm(queryParam);
    setSelectedCategory(categoryParam);
  }, [queryParam, categoryParam]);

  // Fetch all variants
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/variants`);
        setCars(data);
        // Fetch availability for each variant
        const availabilityData = {};
        await Promise.all(
          data.map(async (variant) => {
            const res = await axios.get(
              `${API_URL}/variants/${variant._id}/availability?fromDate=${new Date().toISOString()}&toDate=${new Date(
                new Date().getTime() + 24 * 60 * 60 * 1000
              ).toISOString()}`
            );
            availabilityData[variant._id] = res.data.vehicles;
          })
        );
        setAvailability(availabilityData);
      } catch (err) {
        console.error("Error fetching variants or availability:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVariants();
  }, []);

  // Header scroll
  useEffect(() => {
    const threshold = 30;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (lastScrollY.current - currentScrollY > threshold) {
        setShowHeader(true);
      } else if (currentScrollY - lastScrollY.current > threshold) {
        setShowHeader(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookNow = (car) => {
    navigate("/booking", { state: { car } });
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSearchTerm("");
    setCommittedSearchTerm("");
    navigate(`/search?category=${cat}`);
  };

  const handleSearch = () => {
    setCommittedSearchTerm(searchTerm);
    navigate(`/search?query=${searchTerm}&category=${selectedCategory}`);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setCommittedSearchTerm(suggestion);
    navigate(`/search?query=${suggestion}&category=${selectedCategory}`);
  };

  // Suggestions
  const suggestions = cars
    .filter(
      (car) =>
        searchTerm.trim() !== "" &&
        (car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.company.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .map((car) => `${car.company} ${car.name}`)
    .slice(0, 5);

  // Filtered cars
  const filteredCars = cars
    .filter((car) => {
      const fullName = `${car.company} ${car.name}`.toLowerCase();
      const matchesSearch =
        committedSearchTerm.trim() === "" ||
        fullName.includes(committedSearchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || car.type === selectedCategory;
      const matchesAC = filters.ac.length === 0 || filters.ac.includes(car.ac);
      const matchesSeating =
        filters.seatingCapacity.length === 0 ||
        filters.seatingCapacity.includes(Number(car.seating));
      const matchesCompany =
        filters.company.length === 0 || filters.company.includes(car.company);
      const matchesPrice =
        car.price >= filters.priceRange[0] &&
        car.price <= filters.priceRange[1];
      return (
        matchesSearch &&
        matchesCategory &&
        matchesAC &&
        matchesSeating &&
        matchesCompany &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === "priceLowToHigh") return a.price - b.price;
      if (filters.sortBy === "priceHighToLow") return b.price - a.price;
      return 0;
    });

  const allCompanies = Array.from(new Set(cars.map((car) => car.company)));

  return (
    <div className="w-full min-h-screen bg-[#DCD5FB]">
      <FilterSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        filters={filters}
        setFilters={setFilters}
        allCompanies={allCompanies}
      />

      {/* Header */}
      <div
        className={`fixed top-0 left-0 w-full bg-[#DCD5FB] z-40 transition-transform duration-800 ease-in-out ${
          showHeader ? "translate-y-[64px]" : "-translate-y-full"
        }`}
      >
        <div className="px-4 sm:py-8 py-5 sm:max-w-6xl sm:mx-auto">
          <div className="flex flex-col gap-2 relative">
            <div className="flex flex-row items-center gap-1">
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:flex-1 px-4 py-1 sm:py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <button
                onClick={handleSearch}
                className="sm:p-3 p-2 bg-blue-800 text-white rounded-full hover:bg-blue-700 transition sm:w-auto"
              >
                <Search className="w-3 h-3 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setShowFilterSidebar(true)}
                className="p-2 text-gray-700 rounded-md sm:w-auto"
              >
                <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md z-10">
                {suggestions.map((sug, i) => (
                  <li
                    key={i}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    {sug}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="sm:mt-3 mt-2 flex gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
            {categories.map((cat) => (
              <span
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`sm:px-3 px-3 sm:py-2 py-2 rounded-full text-[10px] sm:text-sm cursor-pointer transition ${
                  selectedCategory === cat
                    ? "bg-blue-800 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cars List */}
      <div className="sm:pt-[250px] pt-44 px-2 sm:px-4 sm:max-w-6xl sm:mx-auto">
        {loading ? (
          <p className="text-center text-gray-600">Loading cars...</p>
        ) : (
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredCars.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">
                No cars found.
              </p>
            ) : (
              filteredCars.map((car) => {
                const carAvailability = availability[car._id] || [];
                const isAvailable = carAvailability.some((v) => v.available);

                return (
                  <div
                    key={car._id}
                    className={`relative rounded-xl p-2 sm:p-4 shadow-md hover:shadow-lg transition ${
                      isAvailable ? "bg-white" : "bg-gray-200"
                    }`}
                  >
                    <img
                      src={`${API_URL.replace("/api", "")}${car.image}`}
                      alt={car.name}
                      className={`w-full h-28 sm:h-40 object-contain mb-3 sm:mb-4 ${
                        !isAvailable ? "filter grayscale opacity-50" : ""
                      }`}
                    />
                    <h3 className="text-[13px] sm:text-lg font-semibold leading-snug">
                      {car.company} {car.name}
                    </h3>
                    <p className="text-[10px] sm:text-sm text-gray-500">
                      {car.type}
                    </p>
                    <p className="mt-1 sm:mt-2 text-blue-800 font-bold text-[13px] sm:text-base">
                      ₹{car.price}/day
                    </p>
                    <p className="text-[8px] sm:text-sm text-gray-600">
                      AC: {car.ac} | Seats: {car.seating}
                    </p>
                    <button
                      onClick={() => handleBookNow(car)}
                      disabled={!isAvailable}
                      className={`absolute bottom-2 right-2 text-[10px] sm:text-sm px-2 py-1 rounded-md transition cursor-pointer ${
                        isAvailable
                          ? "bg-blue-800 text-white hover:bg-blue-700"
                          : "bg-gray-400 text-gray-200 cursor-not-allowed"
                      }`}
                    >
                      {isAvailable ? "Book Now" : "Not Available"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
