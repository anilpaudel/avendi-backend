const mongoose = require('../config/database');

const Model = require('./base_model');
const extensionRateSchema = require('../schemas/extensionRate');
const { collectionNames, createSchema } = require('../schemas/index');

class ExtensionRate extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(collectionNames.CATEGORY, extensionRateSchema);

    super(model);
  }

  fetchAll() {
    return this.model.find();
  }
}
module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new ExtensionRate(tenantConnection);
};
