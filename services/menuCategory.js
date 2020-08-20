
const MenuCategory = require('../models/menu_category');

exports.createMenuCategory = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return MenuCategory.save(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = () => MenuCategory.fetchAll();

exports.fetchById = (menuCategoryId) => MenuCategory.fetchById(menuCategoryId);

exports.updateMenuCategory = (menuCategoryId, updateData) =>
  MenuCategory.updateById(menuCategoryId, updateData);

exports.deleteMenuCategory = (menuCategoryId) => MenuCategory.deleteById(menuCategoryId)
