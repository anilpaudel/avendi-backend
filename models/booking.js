const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const bookingSchema = require('../schemas/booking');
const { collectionNames } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');

const Room = require('./room');
const User = require('./user');
const { buildPageParams } = require('../utils/pagination');

class Booking extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.BOOKING,
      bookingSchema.plugin(mongoosePaginate)
    );

    super(model);
    Room();
    User();
  }
  fetchAll(filter) {
    const options = {
      ...buildPageParams(filter),
      populate: 'guestId roomId',
      sort: { dateCheckOut: -1 },
    };

    return this.model.paginate({}, options);
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
