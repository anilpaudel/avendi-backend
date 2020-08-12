const mongoose = require('../config/database');

const Model = require('./baseModel');
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
}

module.exports = new GuestExtension();