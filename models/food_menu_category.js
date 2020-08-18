const mongoose = require('../config/database');

const Model = require('./base_model');
const categorySchema = require('../schemas/foodMenuCategory');
const { collectionNames, createSchema } = require('../schemas/index');

class FoodMenuCategory extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.FOOD_MENU_CATEGORY,
      createSchema(categorySchema, { timestamps: true })
    );

    super(model);
  }
}

module.exports = new FoodMenuCategory();
