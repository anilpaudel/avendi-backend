const { Router } = require('express');

const router = Router();

const tempController = (req, res) =>
  res.status(200).json({ message: 'Route Working. Need to implement!' });

/**
 * GET /api/users/
 */
router.get('/', tempController);

/**
 * GET /api/users/:userId
 */
router.get('/:userId', tempController);

/**
 * POST /api/users/
 */
router.post('/', tempController);

/**
 * DELETE /api/users/:userId
 */
router.delete('/:userId', tempController);

/**
 * PUT /api/users/:userId
 */
router.put('/:userId', tempController);

module.exports = router;
