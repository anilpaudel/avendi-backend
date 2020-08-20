const mongoose = require('../config/database');

const Model = require('./base_model');
const feedBackSchema = require('../schemas/feedback');
const { collectionNames, createSchema } = require('../schemas/index');

class FeedBack extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.FEEDBACK,
      createSchema(feedBackSchema, { timestamps: true })
    );

    super(model);
  }

  fetchAll() {
    return this.model.find().populate({
      path: 'bookingId staffId',
      populate: [{ path: 'roomId', select: 'number' }, { path: 'guestId' }],
    });
  }

  fetchById(id) {
    return this.model.findById(id).populate({
      path: 'bookingId staffId',
      populate: [{ path: 'roomId', select: 'number' }, { path: 'guestId' }],
    });
  }
}

module.exports = new FeedBack();
