const { ROOM_TYPES } = require('../constants/room');
const BOOKING_STATUS = require('../constants/booking');

module.exports = {
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
  },
  type: {
    type: String,
    required: true,
    enum: Object.keys(ROOM_TYPES).map((key) => ROOM_TYPES[key]),
  },
  status: {
    type: String,
    required: true,
    default: BOOKING_STATUS.VACANT,
    enum: Object.keys(BOOKING_STATUS).map((key) => BOOKING_STATUS[key]),
  },
};
