const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Booking = require("../models/booking");
const User = require("../models/user");
const Variant = require("../models/variant");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// 1️⃣ Create order (amount in paise)
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// 2️⃣ Verify payment & save booking with vehicle allocation
router.post("/verify", async (req, res) => {
  try {
    const { userId, variantId, fromDate, toDate, totalPrice, paymentId } = req.body;

    const user = await User.findById(userId);
    const variant = await Variant.findById(variantId);
    if (!user || !variant) return res.status(404).json({ message: "User or Variant not found" });

    // 🔹 1. Find booked vehicles in selected date range
    const bookedVehicles = await Booking.find({
      variant: variantId,
      $or: [
        { fromDate: { $lte: toDate, $gte: fromDate } },
        { toDate: { $gte: fromDate, $lte: toDate } },
        { fromDate: { $lte: fromDate }, toDate: { $gte: toDate } }
      ],
      status: { $in: ["Upcoming"] }
    }).distinct("vehicleRegNo");

    // 🔹 2. Find first available vehicle
    const availableVehicle = variant.vehicles.find(v => !bookedVehicles.includes(v));
    if (!availableVehicle) {
      return res.status(400).json({ message: "No vehicles available for selected dates" });
    }

    // 🔹 3. Create booking
    const booking = new Booking({
      user: user._id,
      variant: variant._id,
      vehicleRegNo: availableVehicle,  // ← allocated vehicle
      fromDate,
      toDate,
      totalPrice,
      paymentStatus: "Paid",
      paymentId,
      status: "Upcoming"
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Booking failed" });
  }
});

module.exports = router;
