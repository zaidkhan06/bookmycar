const express = require('express');
const Variant = require('../models/variant');
const upload = require('../middleware/upload');
const Booking = require("../models/booking");
const {
  getAllVariants,
  addVehicle,
  deleteVehicle,
} = require("../controllers/variantController");


const router = express.Router();
//  Add Variant
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, company, type, price, seating, ac } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "Image is required" });
    }

    const newVariant = new Variant({
      name,
      company,
      type,
      price,
      seating,
      ac,
      image: `/uploads/${req.file.filename}`, // save image path
    });

    await newVariant.save();
    res.status(201).json({ msg: "Variant added successfully", variant: newVariant });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

//Get All Variants
router.get("/", async (req, res) => {
  try {
    const variants = await Variant.find();
    res.json(variants);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

router.post("/:id/vehicles", addVehicle);
router.delete("/:id/vehicles/:regNo", deleteVehicle);

router.get("/:id", async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id);
    if (!variant) {
      return res.status(404).json({ msg: "Variant not found" });
    }
    res.json(variant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

router.get("/:id/availability", async (req, res) => {
  try {
    const { id } = req.params;
    const { fromDate, toDate } = req.query;

    const variant = await Variant.findById(id);
    if (!variant) return res.status(404).json({ msg: "Variant not found" });

    // Find booked vehicles in this date range
    const bookedVehicles = await Booking.find({
      variant: id,
      $or: [
        { fromDate: { $lte: new Date(toDate), $gte: new Date(fromDate) } },
        { toDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
        { fromDate: { $lte: new Date(fromDate) }, toDate: { $gte: new Date(toDate) } }
      ],
      status: { $in: ["Upcoming"] }
    }).distinct("vehicleRegNo");

    const vehiclesAvailability = variant.vehicles.map(v => ({
      regNo: v,
      available: !bookedVehicles.includes(v)
    }));

    res.json({ vehicles: vehiclesAvailability });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
