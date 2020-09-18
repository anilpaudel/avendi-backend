const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const roomSchema = require('../schemas/room');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');
const { buildPageParams } = require('../utils/pagination');

class Room extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.ROOM,
      roomSchema.plugin(mongoosePaginate)
    );

    super(model);
  }

  fetchAll(filter) {
    const option = buildPageParams(filter);

    return this.model.paginate({}, option);
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new Room(tenantConnection);
};
