const User = require('../models/user');
const Feedback = require('../models/feedback');
const Message = require('../models/message');
const Booking = require('../models/booking');
const AuthenticationError = require('../lib/errors/authentication');
const ValidationError = require('../lib/errors/validation');
const CustomError = require('../lib/errors/customError');
const { USER_TYPE } = require('../constants/user');
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

    const feedback = await Feedback.save(feedbackData);
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

exports.fetchAll = async function () {
  const feedbackList = await Feedback.fetchAll();

  const formattedResult = feedbackList.map(formatFeedbackData);

  return formattedResult;
};

exports.fetchById = async (feedbackId) => {
  const data = await Feedback.fetchById(feedbackId);

  if (!data) {
    return {};
  }

  return formatFeedbackData(data);
};

exports.updateFeedback = (feedbackId, updateData) =>
  Feedback.updateById(feedbackId, updateData);

exports.deleteFeedback = (feedbackId) => Feedback.deleteById(feedbackId);
