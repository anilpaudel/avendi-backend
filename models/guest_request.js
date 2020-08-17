const mongoose = require('../config/database');

const Model = require('./base_model');
const guestRequestSchema = require('../schemas/guestRequest');
const { collectionNames, createSchema } = require('../schemas/index');

class GuestRequest extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.GUEST_REQUEST,
      createSchema(guestRequestSchema, { timestamps: true })
    );

    super(model);
  }

  fetchAll(type) {
    return this.model.find({ type: type });
  }
}

module.exports = new GuestRequest();
