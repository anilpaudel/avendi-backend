const { Schema } = require('mongoose');

const { collectionNames } = require('./index');

module.exports = {
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.BOOKING, // when we use ref need to make sure the collection name is same through out the project
    required: true,
  },
  type: { type: String },
  rating: { type: Number, required: true },
  comment: { type: String },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.USER,
    required: true,
  },
};
