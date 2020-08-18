const HttpStatus = require('http-status-codes');

const foodMenuService = require('../services/foodMenu');

/**
 * Add foodmenu.
 */
exports.create = async (req, res, next) => {
  try {
    const data = await foodMenuService.createFoodMenu(req.body);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all foodMenu.
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const data = await foodMenuService.fetchAll();
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get foodMenu by ID.
 */
exports.fetchById = async (req, res, next) => {
  try {
    const { foodMenuId } = req.params;
    const data = await foodMenuService.fetchById(foodMenuId);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Update foodMenu by ID.
 */
exports.updateFoodMenu = async (req, res, next) => {
  try {
    const { foodMenuId } = req.params;
    const updatePayload = req.body;
    const data = await foodMenuService.updateFoodMenu(foodMenuId, updatePayload);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete foodMenu by ID.
 */
exports.deleteFoodMenu = async (req, res, next) => {
  try {
    const { foodMenuId } = req.params;

    await foodMenuService.deleteFoodMenu(foodMenuId);
    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
};
