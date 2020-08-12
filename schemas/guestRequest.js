const { Schema } = require('mongoose');

const { collectionNames } = require('./index');

module.exports = {
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.BOOKING, // when we use ref need to make sure the collection name is same through out the project
    required: true,
  },
  type: { type: String },
  requestType: { type: String },
  details: { type: String, maxLength: 500 },
  requestedAt: { type: Date },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.USER,
    required: true,
  },
  completionBy: { type: String },
  status: { type: String, required: true }, // maybe enum?
};
