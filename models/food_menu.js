const mongoose = require('../config/database');

const Model = require('./base_model');
const foodMenuSchema = require('../schemas/foodMenu');
const { collectionNames, createSchema } = require('../schemas/index');

class FoodMenu extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.FOOD_MENU,
      createSchema(foodMenuSchema, { timestamps: true })
    );

    super(model);
  }
}

module.exports = new FoodMenu();
