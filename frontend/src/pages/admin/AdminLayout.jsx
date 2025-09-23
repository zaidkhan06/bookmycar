import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  UserPlus,
  Car,
  ClipboardList,
  Users,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  // Admin info from localStorage
  const admin = JSON.parse(localStorage.getItem("admin")); // assume { name: "Zaid Khan", email: "...", ... }
  const adminName = admin?.fullName || "Admin";
  const firstLetter = adminName.charAt(0).toUpperCase();

  //  Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <>
      {/* Mobile/Tablet Warning */}
      <div className=" lg:hidden min-h-screen flex items-center justify-center px-6 text-center">
        <p className="text-lg text-gray-600 font-medium italic">
          Sorry, the admin section is not available on mobile or tablet devices.
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* ✅ Fixed Top Navbar */}
        <header className="fixed top-0 left-0 w-full h-16 bg-white z-50 flex items-center justify-between px-6 shadow">
          <h1 className="text-2xl font-bold text-blue-800">Admin Panel</h1>

          {/* ✅ Profile Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {firstLetter}
            </div>
            <span className="text-gray-700 font-medium">Hi, {adminName}</span>
          </div>
        </header>

        {/* Sidebar */}
        <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg p-4">
          <nav className="flex flex-col gap-3 text-gray-700 text-sm mt-2">
            <NavLink
              to="/admin/newregister"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold" : ""
                }`
              }
            >
              <UserPlus size={18} /> Register Admin
            </NavLink>
            <NavLink
              to="/admin/add-variants"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold" : ""
                }`
              }
            >
              <Plus size={18} /> Add Variants
            </NavLink>
            <NavLink
              to="/admin/variants"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold" : ""
                }`
              }
            >
              <Car size={18} /> Variants
            </NavLink>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold" : ""
                }`
              }
            >
              <ClipboardList size={18} /> Bookings
            </NavLink>
            <NavLink
              to="/admin/customers"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold" : ""
                }`
              }
            >
              <Users size={18} /> Customers
            </NavLink>

            {/* ✅ Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-100 text-red-600 text-left"
            >
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        {/* ✅ Scrollable Main Content */}
        <main className="ml-64 pt-20 p-4 bg-gray-100 min-h-screen max-h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
