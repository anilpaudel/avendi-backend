const { Router } = require('express');

const router = Router();

const tempController = (req, res) =>
  res.status(200).json({ message: 'Route Working. Need to implement!' });

/**
 * GET /api/category/
 */
router.get('/', tempController);

/**
 * GET /api/category/:categoryId
 */
router.get('/:categoryId', tempController);

/**
 * POST /api/category/
 */
router.post('/', tempController);

/**
 * DELETE /api/category/:categoryId
 */
router.delete('/:categoryId', tempController);

/**
 * PUT /api/category/:categoryId
 */
router.put('/:categoryId', tempController);

module.exports = router;
