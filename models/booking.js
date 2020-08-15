const mongoose = require('../config/database');

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
  fetchAll() {
    return this.model.find();
  }

  findPreviousBooking(roomId, newCheckinDate, newCheckoutDate) {
    return this.model.findOne({
      roomId: roomId,
      $or: [
        {
          dateCheckin: {
            $gte: newCheckinDate,
            $lte: newCheckoutDate,
          },
        },
        {
          dateCheckout: {
            $gte: newCheckinDate,
            $lte: newCheckoutDate,
          },
        },
      ],
    });
  }
}

module.exports = new Booking();
