const mongoose = require('../config/database');

const Model = require('./base_model');
const serviceSchema = require('../schemas/service');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');

class Service extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(collectionNames.SERVICE, serviceSchema);

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
  return new Service(tenantConnection);
};
