import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  rating: { type: Number, default: 4 },
  images: [{ type: String }]
});

export default mongoose.model("Hotel", hotelSchema);
