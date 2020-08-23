const mongoose = require('../config/database');

const Model = require('./base_model');
const bookingSchema = require('../schemas/booking');
const { collectionNames, createSchema } = require('../schemas/index');
const { dateCheckout } = require('../schemas/booking');

class Booking extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.BOOKING,
      createSchema(bookingSchema, { timestamps: true })
    );

    super(model);
  }
  fetchAll() {
    return this.model.find();
  }

  findActiveBooking(guestId) {
    const currentDate = new Date();

    return this.model.findOne({
      guestId: guestId,
      $or: [
        {
          dateCheckin: {
            $lte: currentDate,
          },
        },
        {
          dateCheckout: {
            $gte: currentDate,
          },
        },
      ],
    });
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

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new Booking(tenantConnection);
};
