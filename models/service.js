const mongoose = require('../config/database');

const Model = require('./baseModel');
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
}

module.exports = new Service();
