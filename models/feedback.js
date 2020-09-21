const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const Booking = require('./booking');
const Staff = require('./staff');
const Room = require('./room');
const feedBackSchema = require('../schemas/feedback');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');
const { buildPageParams } = require('../utils/pagination');
class FeedBack extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.FEEDBACK,
      feedBackSchema.plugin(mongoosePaginate)
    );

    Booking();
    Staff();
    Room();

    super(model);
  }

  fetchAll(filter) {
    const options = {
      ...buildPageParams(filter),
      populate: {
        path: 'bookingId staffId',
        populate: [{ path: 'roomId', select: 'number' }, { path: 'guestId' }],
      },
      sort: { updatedAt: -1 },
    };
    return this.model.paginate({}, options);
  }

  fetchById(id) {
    return this.model.findById(id).populate({
      path: 'bookingId staffId',
      populate: [{ path: 'roomId', select: 'number' }, { path: 'guestId' }],
    });
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new FeedBack(tenantConnection);
};
