const mongoose = require('../config/database');

const Model = require('./base_model');
const guestRequestSchema = require('../schemas/guestRequest');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');

class GuestRequest extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.GUEST_REQUEST,
      createSchema(guestRequestSchema, { timestamps: true })
    );

    super(model);
  }

  fetchAll(type) {
    return this.model.find({ type: type });
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new GuestRequest(tenantConnection);
};
