const { Router } = require('express');

const router = Router();

const tempController = (req, res) =>
  res.status(200).json({ message: 'Route Working. Need to implement!' });

/**
 * GET /api/feedback/
 */
router.get('/', tempController);

/**
 * GET /api/feedback/:feedbackId
 */
router.get('/:feedbackId', tempController);

/**
 * POST /api/feedback/
 */
router.post('/', tempController);

/**
 * DELETE /api/feedback/:feedbackId
 */
router.delete('/:feedbackId', tempController);

/**
 * PUT /api/feedback/:feedbackId
 */
router.put('/:feedbackId', tempController);

module.exports = router;
