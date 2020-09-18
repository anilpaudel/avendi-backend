const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const serviceSchema = require('../schemas/service');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');
const { buildPageParams } = require('../utils/pagination');

class Service extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.SERVICE,
      serviceSchema.plugin(mongoosePaginate)
    );

    super(model);
  }

  fetchAll(filter) {
    const options = buildPageParams(filter);

    return this.model.paginate({}, options);
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new Service(tenantConnection);
};
