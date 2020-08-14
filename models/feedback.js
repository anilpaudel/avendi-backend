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
}

module.exports = new FeedBack();
