const { Schema } = require('mongoose');

const { collectionNames } = require('./index');
const { EXTENSION_STATUS } = require('../constants/guestExtension');

module.exports = {
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.BOOKING,
    required: true,
  },
  requestType: { type: String },
  extendedTo: { type: Date, required: true },
  rateId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.EXTENSION_RATE,
    required: true,
  },
  assignTo: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.USER,
  },
  status: {
    type: String,
    default: EXTENSION_STATUS.IN_PROGRESS,
    enum: Object.keys(EXTENSION_STATUS).map((key) => EXTENSION_STATUS[key]),
  },
};
