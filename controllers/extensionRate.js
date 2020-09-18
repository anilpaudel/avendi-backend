const HttpStatus = require('http-status-codes');

const extensionRateService = require('../services/extensionRate');

/**
 * Add extension rate.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.create = async (req, res, next) => {
  try {
    const data = await extensionRateService.createExtensionRate(req.body);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all extension rates.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const data = await extensionRateService.fetchAll(req.query);

    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Get extension rate by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchById = async (req, res, next) => {
  try {
    const { extensionRateId } = req.params;

    const data = await extensionRateService.fetchById(extensionRateId);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Update extension rate by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.updateExtensionRate = async (req, res, next) => {
  try {
    const { extensionRateId } = req.params;
    const updatePayload = req.body;

    const data = await extensionRateService.updateExtensionRate(
      extensionRateId,
      updatePayload
    );

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete extension rate by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.deleteExtensionRate = async (req, res, next) => {
  try {
    const { extensionRateId } = req.params;

    await extensionRateService.deleteExtensionRate(extensionRateId);

    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
};
