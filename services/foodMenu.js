const FoodMenu = require('../models/food_menu');

exports.createFoodMenu = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return FoodMenu.save(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const formatMenu = (menu) => {
  const updatedMenu = { ...menu };

  updatedMenu.categories =
    menu.categoryId && menu.categoryId.map((category) => category.name);

  delete updatedMenu.categoryId;

  return updatedMenu;
};

exports.fetchAll = async () => {
  const menuData = await FoodMenu.fetchAll();

  return menuData.map(formatMenu);
};

exports.fetchById = async (foodMenuId) => {
  const menu = await FoodMenu.fetchById(foodMenuId);
  
  return formatMenu(menu);
};

exports.updateFoodMenu = (foodMenuId, updateData) =>
  FoodMenu.updateById(foodMenuId, updateData);

exports.deleteFoodMenu = (foodMenuId) => FoodMenu.deleteById(foodMenuId);
