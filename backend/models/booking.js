const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  variant: { type: mongoose.Schema.Types.ObjectId, ref: "Variant", required: true },
  vehicleRegNo: { type: String, required: true }, // ← allocated vehicle registration number
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["Upcoming", "Completed", "Cancelled"], default: "Upcoming" },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  paymentId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
