const HttpStatus = require('http-status-codes');

const feedbackService = require('../services/feedback');

/**
 * Add feedback.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.create = async (req, res, next) => {
  try {
    const guestId = req.currentUser._id;
    const data = await feedbackService.createFeedback(req.body, guestId);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all feedback.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const data = await feedbackService.fetchAll(req.query);

    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Get feedback by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchById = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;

    const data = await feedbackService.fetchById(feedbackId);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Update feedback by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.updateFeedback = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;
    const updatePayload = req.body;

    const data = await feedbackService.updateFeedback(
      feedbackId,
      updatePayload
    );

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete feedback by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.deleteFeedback = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;

    await feedbackService.deleteFeedback(feedbackId);

    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
};
