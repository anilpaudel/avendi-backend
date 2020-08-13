const { Router } = require('express');

const router = Router();

const tempController = (req, res) =>
  res.status(200).json({ message: 'Route Working. Need to implement!' });

/**
 * GET /api/service/
 */
router.get('/', tempController);

/**
 * GET /api/service/:serviceId
 */
router.get('/:serviceId', tempController);

/**
 * POST /api/service/
 */
router.post('/', tempController);

/**
 * DELETE /api/service/:serviceId
 */
router.delete('/:serviceId', tempController);

/**
 * PUT /api/service/:serviceId
 */
router.put('/:serviceId', tempController);

module.exports = router;
