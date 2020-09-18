const HttpStatus = require('http-status-codes');

const bookingService = require('../services/booking');

/**
 * Add booking.
 */
exports.create = async (req, res, next) => {
  try {
    const data = await bookingService.createBooking(req.body);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all bookings.
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const data = await bookingService.fetchAll(req.query);
    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Update booking by ID.
 */
exports.updateBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const updatePayload = req.body;

    const data = await bookingService.updateBooking(bookingId, updatePayload);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};
