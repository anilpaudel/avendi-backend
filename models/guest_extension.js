const mongoose = require('../config/database');

const Model = require('./base_model');
const guestExtensionSchema = require('../schemas/guestExtension');
const { collectionNames, createSchema } = require('../schemas/index');

class GuestExtension extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.GUEST_EXTENSION,
      guestExtensionSchema
    );

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
  return new GuestExtension(tenantConnection);
};
