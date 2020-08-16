const mongoose = require('../config/database');

const Model = require('./base_model');
const staffSchema = require('../schemas/staff');
const { collectionNames, createSchema } = require('../schemas/index');

class Staff extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.STAFF,
      createSchema(staffSchema, { timestamps: true })
    );

    super(model);
  }

  fetchAll() {
    return this.model.find().populate("userId");
  }
}

module.exports = new Staff();
