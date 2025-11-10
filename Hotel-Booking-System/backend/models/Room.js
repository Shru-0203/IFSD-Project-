const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true }, // single/double/suite
  pricePerNight: { type: Number, required: true },
  totalQuantity: { type: Number, default: 1 },
  amenities: [{ type: String }],
  images: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
