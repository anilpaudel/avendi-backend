const { Schema } = require('mongoose');

const { collectionNames } = require('./index');

module.exports = {
  department: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.USER,
    required: true,
  },
  staffId: { type: Number, required: true, unique: true },
};
