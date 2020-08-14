const mongoose = require('../config/database');

const Model = require('./base_model');
const serviceSchema = require('../schemas/service');
const { collectionNames, createSchema } = require('../schemas/index');

class Service extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.SERVICE,
      createSchema(serviceSchema, { timestamps: true })
    );

    super(model);
  }

  fetchAll() {
    return this.model.find();
  }
}

module.exports = new Service();
