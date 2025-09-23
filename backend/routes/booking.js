// routes/bookings.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const User = require("../models/user");
const Variant = require("../models/variant");
const authMiddleware = require("../middleware/auth"); 
const adminMiddleware = require("../middleware/admin"); // optional: admin-only route

// ---------------------------
// 1️⃣ Fetch all bookings (Admin)
// ---------------------------
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")       // get user info
      .populate("variant")                  // get variant info
      .sort({ createdAt: -1 });             // latest first

    res.status(200).json({ bookings });
  } catch (err) {
    console.error("Error fetching all bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------
// 2️⃣ Fetch bookings for a specific user
// ---------------------------
router.get("/user/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    // Fetch bookings and populate variant info
    const bookings = await Booking.find({ user: userId })
      .populate("variant") // populate variant details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({ bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
