const mongoose = require('../config/database');

const Model = require('./base_model');
const categorySchema = require('../schemas/menuCategory');
const { collectionNames, createSchema } = require('../schemas/index');

class MenuCategory extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.MENU_CATEGORY,
      createSchema(categorySchema, { timestamps: true })
    );

    super(model);
  }

  fetchAll() {
    return this.model.find();
  }
  
}

module.exports = new MenuCategory();
