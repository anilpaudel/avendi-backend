const { Schema } = require('mongoose');

const { collectionNames, createSchema } = require('./index');

module.exports = createSchema({
  department: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.USER,
    required: true,
  },
  staffId: { type: Number, required: true, unique: true },
});
