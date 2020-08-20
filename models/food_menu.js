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

  fetchAll() {
    return this.model.find().populate('categoryId').lean();
  }

  fetchById(id) {
    return this.model.findById(id).populate('categoryId').lean();
  }
}

module.exports = new FoodMenu();
