const mongoose = require('../config/database');

const Model = require('./base_model');
const roomSchema = require('../schemas/room');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');

class Room extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(collectionNames.ROOM, roomSchema);

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
  return new Room(tenantConnection);
};
