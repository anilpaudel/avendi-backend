const { Schema } = require('mongoose');

const { collectionNames, createSchema } = require('./index');

module.exports = createSchema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.BOOKING,
      required: true,
    },
    type: { type: String },
    rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    comment: { type: String, required: true },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.USER,
      required: true,
    },
  },
  { timestamps: true }
);
