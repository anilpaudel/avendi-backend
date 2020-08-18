
const FoodMenu = require('../models/food_menu');

exports.createFoodMenu = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return FoodMenu.save(data);
  } catch (err) {
    console.log(err);
  }
};

exports.fetchAll = () => FoodMenu.fetchAll();

exports.fetchById = (foodMenuId) => FoodMenu.fetchById(foodMenuId);

exports.updateFoodMenu = (foodMenuId, updateData) =>
  FoodMenu.updateById(foodMenuId, updateData);

exports.deleteFoodMenu = (foodMenuId) => FoodMenu.deleteById(foodMenuId)
