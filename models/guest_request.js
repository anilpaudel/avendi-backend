const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const Booking = require('./booking');
const User = require('./user');
const guestRequestSchema = require('../schemas/guestRequest');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');
const { buildPageParams } = require('../utils/pagination');

class GuestRequest extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.GUEST_REQUEST,
      createSchema(guestRequestSchema, { timestamps: true }).plugin(
        mongoosePaginate
      )
    );

    super(model);
    Booking();
    User();
  }

  fetchAll(type, filter) {
    const options = {
      ...buildPageParams(filter),
      populate: {
        path: 'bookingId assignedTo',
        populate: {
          path: 'guestId roomId',
        },
      },
      sort: { requestedAt: -1 },
    };

    return this.model.paginate({ type }, options);
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
