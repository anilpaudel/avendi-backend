const HttpStatus = require('http-status-codes');

const menuCategoryService = require('../services/menuCategory');

/**
 * Add menuCategory.
 */
exports.create = async (req, res, next) => {
  try {
    const data = await menuCategoryService.createMenuCategory(req.body);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all menuCategory.
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const data = await menuCategoryService.fetchAll();
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get menuCategory by ID.
 */
exports.fetchById = async (req, res, next) => {
  try {
    const { menuCategoryId } = req.params;
    const data = await menuCategoryService.fetchById(menuCategoryId);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Update menuCategory by ID.
 */
exports.updateMenuCategory = async (req, res, next) => {
  try {
    const { menuCategoryId } = req.params;
    const updatePayload = req.body;
    const data = await menuCategoryService.updateMenuCategory(menuCategoryId, updatePayload);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete menuCategory by ID.
 */
exports.deleteMenuCategory = async (req, res, next) => {
  try {
    const { menuCategoryId } = req.params;

    await foodMenuService.deleteMenuCategory(menuCategoryId);
    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
};
