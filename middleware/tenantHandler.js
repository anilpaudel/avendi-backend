const { setCurrentTenant } = require('../utils/storage');
const ValidationError = require('../lib/errors/validation');

const tenantService = require('../services/admin');
const { TENANT } = require('../constants/errorMessages');

/**
 * Setting the current tenant
 */
exports.tenantHandler = async function (req, res, next) {
  try {
    const { tenant } = req.headers;
    console.log(req.headers);

    if (!tenant) {
      next(new ValidationError(TENANT.noTenant));
    }

    const currentTenant = await tenantService.fetchByTenantName(tenant);

    console.log('currentTenant', currentTenant);

    if (!currentTenant) {
      next(new ValidationError(TENANT.invalidTenant));
    }

    setCurrentTenant(tenant);
    next();
  } catch (err) {
    next(err);
  }
};
