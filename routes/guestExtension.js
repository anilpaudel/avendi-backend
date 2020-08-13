const { Router } = require('express');

const router = Router();

const tempController = (req, res) =>
  res.status(200).json({ message: 'Method not implemented' });

/**
 * GET /api/extension/
 */
router.get('/', tempController);

/**
 * GET /api/extension/:extensionId
 */
router.get('/:extensionId', tempController);

/**
 * POST /api/extension/
 */
router.post('/', tempController);

/**
 * DELETE /api/extension/:extensionId
 */
router.delete('/:extensionId', tempController);

/**
 * PUT /api/extension/:extensionId
 */
router.put('/:extensionId', tempController);

module.exports = router;
