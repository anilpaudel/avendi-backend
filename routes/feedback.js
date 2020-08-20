const { Router } = require('express');

const feedbackController = require('../controllers/feedback');
const validateRequest = require('../middleware/requestValidator');
const feedbackValidationSchema = require('../validators/feedbackValidator');

const router = Router();

/**
 * GET /api/feedback/
 */
router.get('/', feedbackController.fetchAll);

/**
 * GET /api/feedback/:feedbackId
 */
router.get('/:feedbackId', feedbackController.fetchById);

/**
 * POST /api/feedback/
 */
router.post(
  '/',
  validateRequest(feedbackValidationSchema.create),
  feedbackController.create
);

/**
 * DELETE /api/feedback/:feedbackId
 */
router.delete('/:feedbackId', feedbackController.deleteFeedback);

/**
 * PUT /api/feedback/:feedbackId
 */
router.put(
  '/:feedbackId',
  validateRequest(feedbackValidationSchema.update),
  feedbackController.updateFeedback
);

module.exports = router;
