const mongoose = require('../config/database');

const Model = require('./base_model');
const guestExtenstionSchema = require('../schemas/guestExtension');
const { collectionNames, createSchema } = require('../schemas/index');

class GuestExtension extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.GUEST_EXTENSION,
      createSchema(guestExtenstionSchema, { timestamps: true })
    );

    super(model);
  }

  fetchAll() {
    return this.model.find();
  }
}

module.exports = new GuestExtension();
