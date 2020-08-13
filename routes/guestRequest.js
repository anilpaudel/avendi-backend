const { Router } = require('express');

const router = Router();

const tempController = (req, res) =>
  res.status(200).json({ message: 'Route Working. Need to implement!' });

/**
 * GET /api/request/
 */
router.get('/', tempController);

/**
 * GET /api/request/:requestId
 */
router.get('/:requestId', tempController);

/**
 * POST /api/request/
 */
router.post('/', tempController);

/**
 * DELETE /api/request/:requestId
 */
router.delete('/:requestId', tempController);

/**
 * PUT /api/request/:requestId
 */
router.put('/:requestId', tempController);

module.exports = router;
