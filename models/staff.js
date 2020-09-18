const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const staffSchema = require('../schemas/staff');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');
const { buildPageParams } = require('../utils/pagination');

class Staff extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.STAFF,
      staffSchema.plugin(mongoosePaginate)
    );

    super(model);
  }

  fetchAll(filter) {
    const option = { ...buildPageParams(filter), populate: 'userId' };

    return this.model.paginate({}, option);
  }

  fetchByStaffId(staffId) {
    return this.model.findOne({ staffId });
  }

  fetchByUserId(userId) {
    return this.model.findOne({ userId });
  }

  updateByUserId(userId, updateData) {
    return this.model.findOneAndUpdate({ userId }, updateData, {
      new: true,
    });
  }

  deleteByUserId(userId) {
    return this.model.findOneAndDelete({ userId });
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new Staff(tenantConnection);
};
