const { Schema } = require('mongoose');

const { collectionNames } = require('./index');

module.exports = {
  roomId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.ROOM, // when we use ref need to make sure the collection name is same through out the project
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
  creditCard: { type: Boolean },
  status: { type: String, required: true }, // maybe enum?
};
