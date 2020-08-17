const HttpStatus = require('http-status-codes');

const requestService = require('../services/request');

/**
 * Add request.
 */
exports.create = async (req, res, next) => {
  try {
    const data = await requestService.createRequest(
      req.body,
      req.currentUser._id
    );

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

    const data = await requestService.fetchAll(type);

    res.status(HttpStatus.OK).json({ data });
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
