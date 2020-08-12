const { Schema } = require('mongoose');

const { collectionNames } = require('./index');

module.exports = {
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.CATEGORY, // when we use ref need to make sure the collection name is same through out the project
    required: true,
  },
  price: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, maxLength: 500 },
  image: { type: Buffer, contentType: String },
};
