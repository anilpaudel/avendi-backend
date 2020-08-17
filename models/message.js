const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const messageSchema = require('../schemas/message');
const { collectionNames, createSchema } = require('../schemas/index');

class Message extends Model {
  /**
   * This constructs the Message model with predefined CRUD operations.
   */
  constructor() {
    const model = mongoose.model(
      collectionNames.MESSAGE,
      createSchema(messageSchema, { timestamps: true }).plugin(mongoosePaginate)
    );

    super(model);
  }

  async fetchAll(staffId, guestId, filter = {}) {
    const page = filter.page ? parseInt(filter.page) : 1;
    const limit = filter.size ? parseInt(filter.size) : 20;
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
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

    return { data: result.docs };
  }
}

module.exports = new Message();
