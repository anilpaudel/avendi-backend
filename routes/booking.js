const { Router } = require('express');

const bookingController = require('../controllers/booking');
const validateRequest = require('../middleware/requestValidator');
const bookingValidationSchema = require('../validators/bookingValidator');

const router = Router();

/**
 * GET /api/booking/
 */
router.get('/', bookingController.fetchAll);

/**
 * POST /api/booking/
 */
router.post(
  '/',
  validateRequest(bookingValidationSchema.create),
  bookingController.create
);

/**
 * PUT /api/booking/:bookingId
 */
router.put(
  '/:bookingId',
  validateRequest(bookingValidationSchema.update),
  bookingController.updateBooking
);

module.exports = router;
