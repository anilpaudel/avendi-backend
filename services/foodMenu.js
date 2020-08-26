const FoodMenu = require('../models/food_menu');
const NotFoundError = require('../lib/errors/notFoundError');

exports.createFoodMenu = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return FoodMenu().save(data);
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
  const menuData = await FoodMenu().fetchAll();

  return menuData.map(formatMenu);
};

exports.fetchById = async (foodMenuId) => {
  const menu = await FoodMenu().fetchById(foodMenuId);

  if (!menu) {
    throw new NotFoundError();
  }

  return formatMenu(menu);
};

exports.updateFoodMenu = async (foodMenuId, updateData) => {
  const menu = await FoodMenu().updateById(foodMenuId, updateData);
  if (!menu) {
    throw new NotFoundError();
  }

  return formatMenu(menu);
};

exports.deleteFoodMenu = async (foodMenuId) => {
  const menu = await FoodMenu().deleteById(foodMenuId);
  if (!menu) {
    throw new NotFoundError();
  }
};
