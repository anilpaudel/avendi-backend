const mongoose = require('../config/database');

const Model = require('./base_model');
const staffSchema = require('../schemas/staff');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');

class Staff extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(collectionNames.STAFF, staffSchema);

    super(model);
  }

  fetchAll() {
    return this.model.find().populate('userId');
  }

  fetchByStaffId(staffId) {
    return this.model.findOne({ staffId });
  }

  fetchByUserId(){
    return this.model.findOne({userId});
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
