const { Router } = require('express');

const { USER_TYPE } = require('../constants/user');
const validateUserType = require('../middleware/roleValidator');
const tenantController = require('../controllers/tenant');
const requestValidator = require('../middleware/requestValidator');
const tenantValidationSchema = require('../validators/tenantValidator');
const {
  parseMultiPartFormData,
  parseMultiPartFormDataImage,
} = require('../middleware/multiPartFormHandler');

const router = Router();

/**
 * GET /api/tenant/
 */
router.get('/', tenantController.fetchTenant);

/**
 * PUT /api/tenant/
 */
router.put(
  '/',
  validateUserType([USER_TYPE.ADMIN]),
  parseMultiPartFormData,
  requestValidator(tenantValidationSchema.update),
  tenantController.updateTenant
);

/**
 * POST /api/tenant/image
 */
router.post(
  '/image',
  validateUserType([USER_TYPE.ADMIN]),
  parseMultiPartFormDataImage,
  tenantController.uploadImage
);

module.exports = router;
