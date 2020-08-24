const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const messageSchema = require('../schemas/message');
const { collectionNames, createSchema } = require('../schemas/index');

class Message extends Model {
  /**
   * This constructs the Message model with predefined CRUD operations.
   */
  constructor(dbConnection) {
    const model = dbConnection.model(collectionNames.MESSAGE, messageSchema);

    super(model);
  }

  async fetchAll(staffId, guestId, filter = {}) {
    staffId = staffId.toString();
    guestId = guestId.toString();
    const page = filter.page ? parseInt(filter.page) : 1;
    const limit = filter.size ? parseInt(filter.size) : 20;
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
      populate: [
        {
          path: 'from',
          select: 'firstName lastName _id',
        },
        {
          path: 'to',
          select: 'firstName lastName _id',
        },
      ],
    };

    const result = await this.model.paginate(
      {
        $or: [
          { to: staffId, from: guestId },
          { to: guestId, from: staffId },
        ],
      },
      options
    );
    return result.docs;
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new Message(tenantConnection);
};
