const mongoose = require('../config/database');

const Model = require('./baseModel');
const categorySchema = require('../schemas/category');
const { collectionNames, createSchema } = require('../schemas/index');

class Category extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.CATEGORY,
      createSchema(categorySchema, { timestamps: true })
    );

    super(model);
  }
}

module.exports = new Category();
