const mongoose = require('../services/database');

const Model = require('./base_model');
const bookingSchema = require('../schemas/booking');
const { collectionNames, createSchema } = require('../schemas/index');

class Booking extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.BOOKING,
      createSchema(bookingSchema, { timestamps: true })
    );

    super(model);
  }
}

module.exports = new Booking();