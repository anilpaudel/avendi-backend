const { Router } = require('express');

const foodMenuController = require('../controllers/foodMenu');
const requestValidator = require('../middleware/requestValidator');
const foodMenuValidationSchema = require('../validators/foodMenuValidator');

const router = Router();

/**
 * GET /api/food-menu/
 */
router.get('/', foodMenuController.fetchAll);

/**
 * GET /api/food-menu/:foodMenuId
 */
router.get('/:foodMenuId', foodMenuController.fetchById);

/**
 * POST /api/food-menu/
 */
router.post(
  '/',
  requestValidator(foodMenuValidationSchema.create),
  foodMenuController.create
);

/**
 * DELETE /api/food-menu/:foodMenuId
 */
router.delete('/:foodMenuId', foodMenuController.deleteFoodMenu);

/**
 * PUT /api/food-menu/:foodMenuId
 */
router.put(
  '/:foodMenuId',
  requestValidator(foodMenuValidationSchema.update),
  foodMenuController.updateFoodMenu
);

module.exports = router;
