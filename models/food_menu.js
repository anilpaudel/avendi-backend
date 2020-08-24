const mongoose = require('../config/database');

const Model = require('./base_model');
const foodMenuSchema = require('../schemas/foodMenu');
const { collectionNames, createSchema } = require('../schemas/index');

class FoodMenu extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.FOOD_MENU,
      foodMenuSchema
    );

    super(model);
  }

  fetchAll() {
    return this.model.find().populate('categoryId').lean();
  }

  fetchById(id) {
    return this.model.findById(id).populate('categoryId').lean();
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new FoodMenu(tenantConnection);
};
