const { Router } = require('express');
const bookingController = require('../controllers/booking');

const router = Router();

/**
 * GET /api/booking/
 */
router.get('/', bookingController.fetchAll);

/**
 * POST /api/booking/
 */
router.post('/', bookingController.create);

/**
 * PUT /api/booking/:bookingId
 */
router.put('/:bookingId', bookingController.updateBooking);

module.exports = router;
