const HttpStatus = require('http-status-codes');

const categoryService = require('../services/category');

/**
 * Add category.
 */
exports.create = async (req, res, next) => {
  try {
    const data = await categoryService.createCategory(req.body);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all categories.
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const data = await categoryService.fetchAll();

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get category by ID.
 */
exports.fetchById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const data = await categoryService.fetchById(categoryId);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Update category by ID.
 */
exports.updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const updatePayload = req.body;

    const data = await categoryService.updateCategory(
      categoryId,
      updatePayload
    );

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete category by ID.
 */
exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    await categoryService.deleteCategory(categoryId);

    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
};
