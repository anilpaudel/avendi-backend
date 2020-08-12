const { Schema } = require('mongoose');

const { collectionNames } = require('./index');

module.exports = {
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.BOOKING, // when we use ref need to make sure the collection name is same through out the project
    required: true,
  },
  requestType: { type: String, required: true },
  extendedTo: { type: Date, required: true },
  status: { type: String, required: true }, // maybe enum? ["PENDING", "DONE", "REJECTED"]
};
