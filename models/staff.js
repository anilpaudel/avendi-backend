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
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new Staff(tenantConnection);
};
