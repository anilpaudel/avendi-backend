const HttpStatus = require('http-status-codes');

const tenantService = require('../services/tenant');
/**
 * update Tenant.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.updateTenant = async (req, res, next) => {
  try {
    const tenantData = req.body;
    const { tenant } = req.headers;

    const data = await tenantService.updateTenant(tenant, tenantData, req.file);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Fetch Tenant.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchTenant = async (req, res, next) => {
  try {
    const { tenant } = req.headers;

    const data = await tenantService.fetchByTenantName(tenant);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * upload tenant image.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.uploadImage = async (req, res, next) => {
  try {
    const { tenant } = req.headers;

    const data = await tenantService.uploadHotelImage(tenant, req.file);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};
