import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// GET all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json({ hotels });
  } catch (err) {
    res.status(500).json({ message: "Error fetching hotels", error: err });
  }
});

export default router;
