const { Router } = require('express');

const router = Router();

const tempController = (req, res) =>
  res.status(200).json({ message: 'Route Working. Need to implement!' });

/**
 * GET /api/room/
 */
router.get('/', tempController);

/**
 * GET /api/room/:roomID
 */
router.get('/:roomID', tempController);

/**
 * POST /api/room/
 */
router.post('/', tempController);

/**
 * DELETE /api/room/:roomID
 */
router.delete('/:roomID', tempController);

/**
 * PUT /api/room/:roomID
 */
router.put('/:roomID', tempController);

module.exports = router;
