const { Schema } = require('mongoose');

const { collectionNames } = require('./index');
const { REQUEST_STATUS } = require('../constants/guestRequest');

module.exports = {
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.BOOKING,
    required: true,
  },
  type: { type: String, required: true },
  requestType: { type: String, required: true },
  details: { type: String, maxLength: 500 },
  requestedAt: { type: Date, default: () => new Date() },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.USER,
  },
  completionBy: { type: String },
  status: {
    type: String,
    required: true,
    default: REQUEST_STATUS.NOT_ASSIGNED,
    enum: Object.keys(REQUEST_STATUS).map((key) => REQUEST_STATUS[key]),
  },
};
