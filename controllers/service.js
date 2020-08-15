const HttpStatus = require('http-status-codes');

const serviceService = require('../services/service');

/**
 * Add service.
 */
exports.create = async (req, res, next) => {
  try {
    const data = await serviceService.createService(req.body);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all services.
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const data = await serviceService.fetchAll();

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get service by ID.
 */
exports.fetchById = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const data = await serviceService.fetchById(serviceId);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Update service by ID.
 */
exports.updateService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const updatePayload = req.body;

    const data = await serviceService.updateService(serviceId, updatePayload);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete service by ID.
 */
exports.deleteService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    await serviceService.deleteService(serviceId);

    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
};
