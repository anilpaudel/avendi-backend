const MenuCategory = require('../models/menu_category');
const NotFoundError = require('../lib/errors/notFoundError');
const { filterPaginationLabels } = require('../utils/pagination');

exports.createMenuCategory = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return MenuCategory().save(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = async (filter) => {
  const category = await MenuCategory().fetchAll(filter);

  return filterPaginationLabels(category);
};

exports.fetchById = async (menuCategoryId) => {
  const category = await MenuCategory().fetchById(menuCategoryId);
  if (!category) {
    throw new NotFoundError();
  }

  return category;
};

exports.updateMenuCategory = async (menuCategoryId, updateData) => {
  const category = await MenuCategory().updateById(menuCategoryId, updateData);
  if (!category) {
    throw new NotFoundError();
  }

  return category;
};

exports.deleteMenuCategory = async (menuCategoryId) => {
  const category = await MenuCategory().deleteById(menuCategoryId);
  if (!category) {
    throw new NotFoundError();
  }
};
