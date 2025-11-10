const express = require('express');
const router = express.Router();
const { createRoom, getRoom } = require('../controllers/roomController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createRoom); // admin only ideally
router.get('/:id', getRoom);

module.exports = router;
