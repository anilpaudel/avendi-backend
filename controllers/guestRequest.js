const HttpStatus = require('http-status-codes');

const CustomError = require('../lib/errors/customError');
const requestService = require('../services/guestRequest');
const { USER_TYPE } = require('../constants/user');
const ValidationError = require('../lib/errors/validation');

/**
 * Add request.
 */
exports.create = async (req, res, next) => {
  try {
    const guestId =
      req.currentUser.type !== USER_TYPE.GUEST
        ? req.body.guestId
        : req.currentUser._id;

    if (!guestId) {
      throw new ValidationError('Guest Id not provided.');
    }

    const data = await requestService.createRequest(req.body, guestId);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all requests.
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const { type } = req.query;

    const data = await requestService.fetchAll(type, req.query);

    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Get requests by id.
 */
exports.fetchById = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const data = await requestService.fetchById(requestId);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Update request by ID.
 */
exports.updateRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const updatePayload = req.body;

    const data = await requestService.updateRequest(requestId, updatePayload);
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Assign staff to request.
 */
exports.assignToRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { assignedTo } = req.body;

    if (!assignedTo) {
      throw new CustomError('No assignedTo user Id provided', 400);
    }

    const data = await requestService.assignStaffToRequest(
      requestId,
      assignedTo
    );
    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete request by ID.
 */
exports.deleteRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    await requestService.deleteRequest(requestId);

    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
};
