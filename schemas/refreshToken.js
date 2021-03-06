const { Schema } = require('mongoose');

const { collectionNames, createSchema } = require('./index');

module.exports = createSchema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.USER, // need to make sure the collection name is same through out the project
    required: true,
  },
  token: { type: String, required: true },
  revoked: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
});
