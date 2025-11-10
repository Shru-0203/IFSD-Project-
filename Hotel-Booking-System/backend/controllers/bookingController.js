const Booking = require('../models/Booking');
const Room = require('../models/Room');

function overlap(qCheckin, qCheckout, aCheckin, aCheckout) {
  // return true if [qCheckin, qCheckout) overlaps [aCheckin, aCheckout)
  return (aCheckin < qCheckout) && (aCheckout > qCheckin);
}

exports.checkAvailability = async (req, res) => {
  try {
    const { roomId, checkin, checkout } = req.query;
    if (!roomId || !checkin || !checkout)
      return res.status(400).json({ message: 'roomId, checkin and checkout required' });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    if (checkoutDate <= checkinDate) return res.status(400).json({ message: 'Invalid dates' });

    const activeBookings = await Booking.find({
      roomId,
      status: { $in: ['pending','confirmed'] }
    });

    // count overlapping bookings
    let booked = 0;
    for (const b of activeBookings) {
      if (overlap(checkinDate, checkoutDate, b.checkinDate, b.checkoutDate)) booked += 1;
    }

    const available = Math.max(0, room.totalQuantity - booked);
    res.json({ available, totalQuantity: room.totalQuantity, booked });
  } catch (err) {
    console.error('checkAvailability', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Authentication required' });

    const { roomId, hotelId, checkinDate, checkoutDate } = req.body;
    if (!roomId || !hotelId || !checkinDate || !checkoutDate)
      return res.status(400).json({ message: 'Missing required fields' });

    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    if (checkout <= checkin) return res.status(400).json({ message: 'Invalid dates' });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // check overlapping bookings
    const activeBookings = await Booking.find({
      roomId,
      status: { $in: ['pending','confirmed'] }
    });

    let booked = 0;
    for (const b of activeBookings) {
      if (overlap(checkin, checkout, b.checkinDate, b.checkoutDate)) booked += 1;
    }
    if (booked >= room.totalQuantity) return res.status(400).json({ message: 'No availability' });

    const nights = Math.ceil((checkout - checkin) / (1000*60*60*24));
    const totalAmount = nights * room.pricePerNight;

    const booking = await Booking.create({
      userId, hotelId, roomId,
      checkinDate: checkin, checkoutDate: checkout,
      nights, totalAmount, status: 'confirmed'
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error('createBooking', err);
    res.status(500).json({ message: 'Server error', detail: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Authentication required' });
    const bookings = await Booking.find({ userId }).populate('hotelId roomId').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('getUserBookings', err);
    res.status(500).json({ message: 'Server error' });
  }
};
