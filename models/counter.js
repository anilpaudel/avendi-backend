const { isEmpty } = require('lodash');
const mongoose = require('../config/database');

const Model = require('./base_model');
const counterSchema = require('../schemas/counter');
const { collectionNames, createSchema } = require('../schemas/index');
const { COUNTER_NAME } = require('../constants/counter');
const { getCurrentTenant } = require('../utils/storage');

class Counter extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(collectionNames.COUNTER, counterSchema);

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

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new Counter(tenantConnection);
};
