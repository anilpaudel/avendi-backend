const { Router } = require('express');

const foodMenuController = require('../controllers/foodMenu');

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
router.post('/', foodMenuController.create);

/**
 * DELETE /api/food-menu/:foodMenuId
 */
router.delete('/:foodMenuId', foodMenuController.deleteFoodMenu);

/**
 * PUT /api/food-menu/:foodMenuId
 */
router.put('/:foodMenuId', foodMenuController.updateFoodMenu);

module.exports = router;
