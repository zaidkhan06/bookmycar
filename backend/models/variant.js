const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    seating: { type: Number, required: true },
    ac: { type: String, enum: ["AC", "Non-AC"], required: true },
    image: { type: String }, // image url

    // ✅ Vehicles array to store registration numbers
    vehicles: {
      type: [String],
      default: [], // initially empty
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variant", variantSchema);
