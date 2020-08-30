const mongoose = require('../config/database');

const Model = require('./base_model');
const bookingSchema = require('../schemas/booking');
const { collectionNames } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');

const Room = require('./room');
const User = require('./user');

class Booking extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(collectionNames.BOOKING, bookingSchema);

    super(model);
    Room();
    User();
  }
  fetchAll() {
    return this.model.find().populate('guestId roomId');
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
