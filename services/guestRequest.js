const User = require('../models/user');
const Booking = require('../models/booking');
const { USER_TYPE } = require('../constants/user');
const Request = require('../models/guest_request');
const CustomError = require('../lib/errors/customError');
const ValidationError = require('../lib/errors/validation');
const { REQUEST_STATUS } = require('../constants/guestRequest');

exports.createRequest = async function (payload, guestId) {
  try {
    const data = {
      ...payload,
    };

    const currentBooking = await Booking.findActiveBooking(guestId);

    if (!currentBooking) {
      throw new CustomError('No active booking found.');
    }

    if (data && data.assignTo) {
      const assignee = await User.fetchById(data.assignTo);

      if (!assignee || (assignee && assignee.type === USER_TYPE.GUEST)) {
        throw new ValidationError('Invalid AssignTo id provided.');
      }
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

exports.assignStaffToRequest = async function (requestId, staffId) {
  const user = await User.fetchById(staffId);

  if (!user || (user && user.type === USER_TYPE.GUEST)) {
    throw new ValidationError('Invalid AssignTo id provided.');
  }

  return Request.updateById(requestId, {
    assignTo: staffId,
    status: REQUEST_STATUS.IN_PROGRESS,
  });
};

exports.deleteRequest = (requestId) => Request.deleteById(requestId);
