const mongoose = require('../config/database');

const Model = require('./base_model');
const Booking = require('./booking');
const User = require('./user');
const guestRequestSchema = require('../schemas/guestRequest');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');

class GuestRequest extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.GUEST_REQUEST,
      createSchema(guestRequestSchema, { timestamps: true })
    );

    super(model);
    Booking();
    User();
  }

  fetchAll(type) {
    console.log('Test');
    return this.model.find({ type: type }).populate({
      path: 'bookingId assignedTo',
      populate: {
        path: 'guestId roomId',
      },
    });
  }

  fetchById(id) {
    return this.model.fetchById(id).populate({
      path: 'bookingId assignedTo',
      populate: {
        path: 'guestId roomId',
      },
    });
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new GuestRequest(tenantConnection);
};
