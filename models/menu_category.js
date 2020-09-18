const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const categorySchema = require('../schemas/menuCategory');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');
const ValidationError = require('../lib/errors/validation');
const { TENANT } = require('../constants/errorMessages');
const { buildPageParams } = require('../utils/pagination');

class MenuCategory extends Model {
  constructor(db) {
    const model = db.model(
      collectionNames.MENU_CATEGORY,
      categorySchema.plugin(mongoosePaginate)
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
  return new MenuCategory(tenantConnection);
};
