const { Schema } = require('mongoose');

const { collectionNames, createSchema } = require('./index');

module.exports = createSchema({
  price: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, maxLength: 500 },
  image: { type: String },
  categoryId: [
    {
      type: Schema.Types.ObjectId,
      ref: collectionNames.MENU_CATEGORY,
      required: true,
    },
  ],
});
