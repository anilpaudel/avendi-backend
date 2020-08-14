
const Booking = require('../models/booking');

exports.createBooking = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return Booking.save(data);
  } catch (err) {
    console.log(err);
  }
};

exports.fetchAll = () => Booking.fetchAll();

exports.updateBooking = (bookingId, updateData) =>
  Booking.updateById(bookingId, updateData);
