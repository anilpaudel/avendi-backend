const mongoose = require('../config/database');

const Model = require('./base_model');
const categorySchema = require('../schemas/menuCategory');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');
const ValidationError = require('../lib/errors/validation');
const { TENANT } = require('../constants/errorMessages');

class MenuCategory extends Model {
  constructor(db) {
    const model = db.model(
      collectionNames.MENU_CATEGORY,
      createSchema(categorySchema, { timestamps: true })
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
  return new MenuCategory(tenantConnection);
};
