const mongoose = require('../config/database');

const Model = require('./base_model');
const Booking = require('./booking');
const Staff = require('./staff');
const Room = require('./room');
const User = require('./user');
const ExtensionRate = require('./extension-rate');

const guestExtensionSchema = require('../schemas/guestExtension');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');

class GuestExtension extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.GUEST_EXTENSION,
      guestExtensionSchema
    );

    super(model);
    Booking();
    Room();
    User();
    ExtensionRate();
  }

  fetchAll() {
    return this.model.find().populate({
      path: 'bookingId assignedTo rateId',
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
  return new GuestExtension(tenantConnection);
};
