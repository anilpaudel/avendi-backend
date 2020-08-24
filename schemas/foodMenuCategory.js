const { Schema } = require('mongoose');

const { collectionNames, createSchema } = require('./index');

module.exports = createSchema({
  menuCategoryId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.MENU_CATEGORY,
    required: true,
  },
  foodMenuId: {
    type: Schema.Types.ObjectId,
    ref: collectionNames.FOOD_MENU,
    required: true,
  },
});
