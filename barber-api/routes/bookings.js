const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBooking, deleteBooking } = require('../controllers/bookingController');

// POST: Kreiraj novu rezervaciju
router.post('/', createBooking);

// GET: Sve rezervacije
router.get('/', getBookings);

// PUT: Ažuriraj rezervaciju
router.put('/:id', updateBooking);

// DELETE: Obriši rezervaciju
router.delete('/:id', deleteBooking);

module.exports = router;
