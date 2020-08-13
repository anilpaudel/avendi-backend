const { Router } = require('express');

const router = Router();

const tempController = (req, res) =>
  res.status(200).json({ message: 'Method not implemented' });

/**
 * GET /api/booking/
 */
router.get('/', tempController);

/**
 * GET /api/booking/:bookingId
 */
router.get('/:bookingId', tempController);

/**
 * POST /api/booking/
 */
router.post('/', tempController);

/**
 * DELETE /api/booking/:bookingId
 */
router.delete('/:bookingId', tempController);

/**
 * PUT /api/booking/:bookingId
 */
router.put('/:bookingId', tempController);

module.exports = router;
