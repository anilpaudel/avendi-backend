const HttpStatus = require('http-status-codes');

const extensionService = require('../services/guestExtension');
const CustomError = require('../lib/errors/customError');

/**
 * Add extension.
 */
exports.create = async (req, res, next) => {
  try {
    const data = await extensionService.createExtension(
      req.body,
      req.currentUser._id
    );

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all extensions.
 */
exports.fetchAll = async (req, res, next) => {
  try {

    const data = await extensionService.fetchAll();

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get extensions by id.
 */
exports.fetchById = async (req, res, next) => {
  try {
    const { extensionId } = req.params;

    const data = await extensionService.fetchById(extensionId);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Update extension by ID.
 */
exports.updateExtension = async (req, res, next) => {
  try {
    const { extensionId } = req.params;
    const updatePayload = req.body;

    const data = await extensionService.updateExtension(extensionId, updatePayload);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Assign staff to extension.
 */
exports.assignToExtension = async (req, res, next) => {
  try {
    const { extensionId } = req.params;
    const { assignTo } = req.body;

    if (!assignTo) {
      throw new CustomError('No assignTo user Id provided', 400);
    }

    const data = await extensionService.assignStaffToExtension(extensionId, assignTo);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete extension by ID.
 */
exports.deleteExtension = async (req, res, next) => {
  try {
    const { extensionId } = req.params;

    await extensionService.deleteExtension(extensionId);

    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
};
