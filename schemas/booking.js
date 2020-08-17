const { Schema } = require('mongoose');

const { collectionNames } = require('./index');
const { BOOKING_STATUS } = require('../constants/booking');

module.exports = {
  roomId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.ROOM,
    required: true,
  },
  guestId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.USER,
    required: true,
  },
  description: { type: String, maxLength: 500 },
  dateCheckin: { type: Date, required: true },
  dateCheckout: { type: Date },
  status: {
    type: String,
    default: BOOKING_STATUS.BOOKED,
    enum: Object.keys(BOOKING_STATUS).map((key) => BOOKING_STATUS[key]),
  },
  creditCard: { type: Boolean },
};
