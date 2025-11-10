const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  try {
    const payload = req.body;
    const room = await Room.create(payload);
    res.status(201).json(room);
  } catch (err) {
    console.error('createRoom', err);
    res.status(500).json({ message: 'Server error', detail: err.message });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    console.error('getRoom', err);
    res.status(500).json({ message: 'Server error' });
  }
};
