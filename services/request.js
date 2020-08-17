const Booking = require('../models/booking');
const Request = require('../models/guest_request');
const CustomError = require('../lib/errors/customError');

exports.createRequest = async function (payload, guestId) {
  try {
    const data = {
      ...payload,
    };

    const currentBooking = await Booking.findActiveBooking(guestId);

    console.log('booking', currentBooking);

    if (!currentBooking) {
      throw new CustomError('No active booking found.');
    }

    return Request.save({ ...data, bookingId: currentBooking._id });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = (type) => Request.fetchAll(type);

exports.fetchById = (requestId) => Request.fetchById(requestId);

exports.updateRequest = (requestId, updateData) =>
  Request.updateById(requestId, updateData);

exports.deleteRequest = (requestId) => Request.deleteById(requestId);
