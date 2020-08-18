const { Router } = require('express');

const menuCategoryController = require('../controllers/menuCategory');

const router = Router();

/**
 * GET /api/food-menu/category
 */
router.get('/', menuCategoryController.fetchAll);

/**
 * GET /api/food-menu/category/:menuCategoryId
 */
router.get('/:menuCategoryId', menuCategoryController.fetchById);

/**
 * POST /api/food-menu/category/
 */
router.post('/', menuCategoryController.create);

/**
 * DELETE /api/food-menu/category/:menuCategoryId
 */
router.delete('/:menuCategoryId', menuCategoryController.deleteMenuCategory);

/**
 * PUT /api/food-menu/category/:menuCategoryId
 */
router.put('/:menuCategoryId', menuCategoryController.updateMenuCategory);

module.exports = router;
