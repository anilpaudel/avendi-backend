const { Router } = require('express');

const router = Router();

const tempController = (req, res) =>
  res.status(200).json({ message: 'Route Working. Need to implement!' });

/**
 * GET /api/foodmenu/
 */
router.get('/', tempController);

/**
 * GET /api/foodmenu/:foodmenuId
 */
router.get('/:foodmenuId', tempController);

/**
 * POST /api/foodmenu/
 */
router.post('/', tempController);

/**
 * DELETE /api/foodmenu/:foodmenuId
 */
router.delete('/:foodmenuId', tempController);

/**
 * PUT /api/foodmenu/:foodmenuId
 */
router.put('/:foodmenuId', tempController);

module.exports = router;
