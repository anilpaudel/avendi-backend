const { Schema } = require('mongoose');

const { collectionNames } = require('./index');

module.exports = {
  from: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.USER, // need to make sure the collection name is same through out the project
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.USER,
    required: true,
  },
  message: { type: String, required: true },
};
