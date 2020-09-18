const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const Booking = require('./booking');
const Staff = require('./staff');
const Room = require('./room');
const User = require('./user');
const ExtensionRate = require('./extension-rate');

const guestExtensionSchema = require('../schemas/guestExtension');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');
const { buildPageParams } = require('../utils/pagination');
const { option } = require('commander');

class GuestExtension extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.GUEST_EXTENSION,
      guestExtensionSchema.plugin(mongoosePaginate)
    );

    super(model);
    Booking();
    Room();
    User();
    ExtensionRate();
  }

  fetchAll(filter) {
    const options = {
      ...buildPageParams(filter),
      populate: {
        path: 'bookingId assignedTo rateId',
        populate: {
          path: 'guestId roomId',
        },
      },
      sort: { updatedAt: -1 },
    };

    return this.model.paginate({}, options);
  }

  fetchById(id) {
    return this.model.findById(id).populate({
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
