const { isEmpty } = require('lodash');
const mongoose = require('../config/database');

const Model = require('./base_model');
const counterSchema = require('../schemas/counter');
const { collectionNames, createSchema } = require('../schemas/index');
const { COUNTER_NAME } = require('../constants/counter');

class Counter extends Model {
  constructor(dbConnection) {
    const model = mongoose.model(
      collectionNames.COUNTER,
      createSchema(counterSchema, { timestamps: true })
    );

    super(model);
  }
  fetchAll() {
    return this.model.find();
  }

  async fetchStaffCounter() {
    const staffCounter = await this.model.findOne({
      counterName: COUNTER_NAME.STAFF,
    });


    if (!staffCounter || isEmpty(staffCounter)) {
      return this.model.create({ counterName: COUNTER_NAME.STAFF });
    }

    return this.model.findOneAndUpdate(
      { counterName: COUNTER_NAME.STAFF },
      { $inc: { count: 1 } },
      { new: true }
    );
  }
}

module.exports = new Counter();
