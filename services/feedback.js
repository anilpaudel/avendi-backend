const User = require('../models/user');
const Feedback = require('../models/feedback');
const Message = require('../models/message');
const Booking = require('../models/booking');
const AuthenticationError = require('../lib/errors/authentication');
const ValidationError = require('../lib/errors/validation');
const CustomError = require('../lib/errors/customError');
const { USER_TYPE } = require('../constants/user');
const NotFoundError = require('../lib/errors/notFoundError');
const { filterPaginationLabels } = require('../utils/pagination');
//const authMessage = require('../constants/messages').AUTH;

exports.createFeedback = async function (payload, guestId) {
  try {
    const feedbackData = {
      ...payload,
    };

    const currentBooking = await Booking().findActiveBooking(guestId);

    if (!currentBooking) {
      throw new CustomError('No active booking found.');
    }

    feedbackData.bookingId = currentBooking._id;

    const staff = await User().fetchById(feedbackData.staffId);

    if (!staff || (staff && staff.type === USER_TYPE.GUEST)) {
      throw new ValidationError('Invalid Staff id provided.');
    }

    const feedback = await Feedback().save(feedbackData);
    const message = await Message().save({
      from: guestId,
      to: feedbackData.staffId,
      message: feedbackData.comment || feedbackData.rating,
    });

    return feedback;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const formatFeedbackData = (data) => {
  const updatedResult = {
    ...data.toJSON(),
    staff: data.staffId,
    guest: data.bookingId.guestId,
    roomNumber: data.bookingId.roomId.number,
  };

  delete updatedResult.bookingId;
  delete updatedResult.staffId;

  return updatedResult;
};

exports.fetchAll = async function (filter) {
  const feedbackList = await Feedback().fetchAll(filter);

  const formattedResult = feedbackList.docs.map(formatFeedbackData);

  return filterPaginationLabels({ ...feedbackList, docs: formattedResult });
};

exports.fetchById = async (feedbackId) => {
  const data = await Feedback().fetchById(feedbackId);

  if (!data) {
    throw new NotFoundError();
  }

  return formatFeedbackData(data);
};

exports.updateFeedback = async (feedbackId, updateData) => {
  const feedback = await Feedback().updateById(feedbackId, updateData);
  if (!feedback) {
    throw new NotFoundError();
  }

  return feedback;
};

exports.deleteFeedback = async (feedbackId) => {
  const feedback = await Feedback().deleteById(feedbackId);
  if (!feedback) {
    throw new NotFoundError();
  }
};
