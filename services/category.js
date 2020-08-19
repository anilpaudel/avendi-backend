const Category = require('../models/category');

exports.createCategory = function (payload) {
  try {
    const categoryData = {
      ...payload,
    };

    return Category.save(categoryData);
  } catch (err) {
    console.log(err);
  }
};

exports.fetchAll = () => Category.fetchAll();

exports.fetchById = (categoryId) => Category.fetchById(categoryId);

exports.updateCategory = (categoryId, updateData) =>
  Category.updateById(categoryId, updateData);

exports.deleteCategory = (categoryId) => Category.deleteById(categoryId);
