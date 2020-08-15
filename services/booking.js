const User = require('../models/user');
const Room = require('../models/room');
const Booking = require('../models/booking');
const { USER_TYPE } = require('../constants/user');
const CustomError = require('../lib/errors/customError');
const { BOOKING_STATUS } = require('../constants/booking');
const bookingMessage = require('../constants/errorMessages').BOOKING;

async function createBooking(payload) {
  try {
    const data = {
      ...payload,
    };
    const user = await User.fetchById(data.guestId);

    if (!user) {
      throw new CustomError(bookingMessage.invalidUserId);
    }

    if (user.type !== USER_TYPE.GUEST) {
      throw new CustomError(bookingMessage.notGuestId);
    }

    const room = await Room.fetchById(data.roomId);

    if (!room) {
      throw new CustomError(bookingMessage.invalidRoomId);
    }

    const bookingStatus = await findPreviousBooking(
      room._id,
      data.dateCheckin,
      data.dateCheckout
    );

    console.log(bookingStatus);

    if (
      bookingStatus &&
      (bookingStatus.status === BOOKING_STATUS.BOOKED ||
        bookingStatus.status === BOOKING_STATUS.OCCUPIED)
    ) {
      throw new CustomError(bookingMessage.roomNotAvailable);
    }
    // const bookedData = await Booking.save(data);

    return {};
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const fetchAll = () => Booking.fetchAll();

async function updateBooking(bookingId, updateData) {
  const booking = await Booking.fetchById(bookingId);

  if (!booking) {
    throw new CustomError(bookingMessage.invalidBookingId);
  }

  const invalidCheckout =
    updateData &&
    updateData.dateCheckout &&
    !updateData.dateCheckin &&
    updateData.dateCheckout <= booking.dateCheckin;

  const invalidCheckin =
    updateData &&
    updateData.dateCheckin &&
    !updateData.dateCheckout &&
    booking.dateCheckout <= updateData.dateCheckin;

  if (invalidCheckout) {
    throw new CustomError(bookingMessage.dateCheckout);
  }
  if (invalidCheckin) {
    throw new CustomError(bookingMessage.dateCheckin);
  }

  const validCheckin = updateData.dateCheckin || booking.dateCheckin;
  const validCheckout = updateData.dateCheckout || booking.dateCheckout;

  const previousBooking = await findPreviousBooking(
    bookingId,
    validCheckin,
    validCheckout
  );

  if (
    previousBooking &&
    previousBooking._id !== bookingId &&
    (updateData.dateCheckin || updateData.dateCheckout)
  ) {
    throw new CustomError(bookingMessage.roomNotAvailable);
  }

  return Booking.updateById(bookingId, updateData);
}

async function findPreviousBooking(roomId, dateCheckin, dateCheckout) {
  return Booking.findPreviousBooking(
    roomId,
    new Date(dateCheckin),
    new Date(dateCheckout)
  );
}

module.exports = {
  fetchAll,
  createBooking,
  updateBooking,
};
