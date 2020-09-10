const User = require('../models/user');
const Booking = require('../models/booking');
const { USER_TYPE } = require('../constants/user');
const Request = require('../models/guest_request');
const CustomError = require('../lib/errors/customError');
const ValidationError = require('../lib/errors/validation');
const { REQUEST_STATUS } = require('../constants/guestRequest');
const NotFoundError = require('../lib/errors/notFoundError');

exports.createRequest = async function (payload, guestId) {
  try {
    const data = {
      ...payload,
    };

    const guest = await User().fetchById(guestId);

    if (!guest || guest.type !== USER_TYPE.GUEST) {
      throw new ValidationError('Invalid guest Id provided.');
    }

    const currentBooking = await Booking().findActiveBooking(guestId);

    if (!currentBooking) {
      throw new CustomError('No active booking found.');
    }

    if (data && data.assignedTo) {
      const assignee = await User().fetchById(data.assignedTo);

      if (!assignee || (assignee && assignee.type === USER_TYPE.GUEST)) {
        throw new ValidationError('Invalid AssignedTo id provided.');
      }
    }

    return Request().save({ ...data, bookingId: currentBooking._id });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = (type) => Request().fetchAll(type);

exports.fetchById = async (requestId) => {
  const request = await Request().fetchById(requestId);
  if (!request) {
    throw new NotFoundError();
  }

  return request;
};

exports.updateRequest = async (requestId, updateData) => {
  const request = await Request().updateById(requestId, updateData);
  if (!request) {
    throw new NotFoundError();
  }

  return request;
};

exports.assignStaffToRequest = async function (requestId, staffId) {
  const user = await User().fetchById(staffId);

  if (!user || (user && user.type === USER_TYPE.GUEST)) {
    throw new ValidationError('Invalid AssignTo id provided.');
  }

  const request = await Request().updateById(requestId, {
    assignedTo: staffId,
    status: REQUEST_STATUS.IN_PROGRESS,
  });
  if (!request) {
    throw new NotFoundError();
  }

  return request;
};

exports.deleteRequest = async (requestId) => {
  const request = await Request().deleteById(requestId);
  if (!request) {
    throw new NotFoundError();
  }
};
