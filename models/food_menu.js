const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const Model = require('./base_model');
const foodMenuSchema = require('../schemas/foodMenu');
const { collectionNames, createSchema } = require('../schemas/index');
const { getCurrentTenant } = require('../utils/storage');
const { buildPageParams } = require('../utils/pagination');

// const MenuCategory = require('./menu_category');

class FoodMenu extends Model {
  constructor(dbConnection) {
    const model = dbConnection.model(
      collectionNames.FOOD_MENU,
      foodMenuSchema.plugin(mongoosePaginate)
    );

    super(model);
    // MenuCategory();
  }

  fetchAll(filter) {
    const options = buildPageParams(filter);

    return this.model.paginate({}, options);
  }

  // fetchById(id) {
  //   return this.model.findById(id).populate('categoryId').lean();
  // }

  // updateById(id, payload) {
  //   return this.model
  //     .findByIdAndUpdate({ _id: id }, payload, { new: true })
  //     .populate('categoryId')
  //     .lean();
  // }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();

  if (!tenantConnection) {
    throw new ValidationError(TENANT.invalidTenant);
  }
  return new FoodMenu(tenantConnection);
};
