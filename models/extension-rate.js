const mongoose = require('../config/database');

const Model = require('./base_model');
const extensionRateSchema = require('../schemas/extensionRate');
const { collectionNames, createSchema } = require('../schemas/index');

class ExtensionRate extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.CATEGORY,
      createSchema(extensionRateSchema, { timestamps: true })
    );

    super(model);
  }

  fetchAll() {
    return this.model.find();
  }
}

module.exports = new ExtensionRate();
