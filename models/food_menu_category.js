// const mongoose = require('../config/database');

// const Model = require('./base_model');
// const categorySchema = require('../schemas/foodMenuCategory');
// const { collectionNames, createSchema } = require('../schemas/index');
// const { getCurrentTenant } = require('../utils/storage');

// class FoodMenuCategory extends Model {
//   constructor(dbConnection) {
//     const model = dbConnection.model(
//       collectionNames.FOOD_MENU_CATEGORY,
//       categorySchema
//     );

//     super(model);
//   }
// }

// module.exports = () => {
//   const tenantConnection = getCurrentTenant();

//   if (!tenantConnection) {
//     throw new ValidationError(TENANT.invalidTenant);
//   }
//   return new FoodMenuCategory(tenantConnection);
// };
