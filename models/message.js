const mongoose = require('../config/database');

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
      createSchema(messageSchema, { timestamps: true })
    );

    super(model);
  }

  // adding custom methods not present in parent
  fetch() {
    return this.model
      .find()
      .populate('to ')
      .populate({ path: 'from', select: 'fullName -_id' }); // to get only fullName and not _id
  }
}

module.exports = new Message();
