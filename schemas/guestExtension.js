const { Schema } = require('mongoose');

const { collectionNames, createSchema } = require('./index');
const { EXTENSION_STATUS } = require('../constants/guestExtension');

module.exports = createSchema(
  {
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
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.USER,
    },
    status: {
      type: String,
      default: EXTENSION_STATUS.IN_PROGRESS,
      enum: Object.keys(EXTENSION_STATUS).map((key) => EXTENSION_STATUS[key]),
    },
  },
  { timestamps: true }
);
