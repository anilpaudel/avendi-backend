const mongoose = require('../config/database');

const Model = require('./base_model');
const foodMenuSchema = require('../schemas/foodMenu');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');

const MenuCategory = require('./menu_category');

class FoodMenu extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(collectionNames.FOOD_MENU, foodMenuSchema);

    super(model);
    MenuCategory();
  }

  fetchAll() {
    return this.model.find().populate('categoryId').lean();
  }

  fetchById(id) {
    return this.model.findById(id).populate('categoryId').lean();
  }

  updateById(id, payload) {
    return this.model
      .findByIdAndUpdate({ _id: id }, payload, { new: true })
      .populate('categoryId')
      .lean();
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new FoodMenu(tenantConnection);
};
