import express from "express";
import Booking from "../models/bookingModel.js"; // ✅ Correct file

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("hotel", "name");
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
