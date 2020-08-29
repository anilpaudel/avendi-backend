const { Router } = require('express');

const { USER_TYPE } = require('../constants/user');
const extensionController = require('../controllers/guestExtension');
const validateUserType = require('../middleware/roleValidator');
const requestValidator = require('../middleware/requestValidator');
const extensionValidationSchema = require('../validators/guestExtensionValidator');

const router = Router();

/**
 * GET /api/guest-extension/
 */
router.get('/', extensionController.fetchAll);

/**
 * GET /api/guest-extension/:extensionId
 */
router.get('/:extensionId', extensionController.fetchById);

/**
 * POST /api/guest-extension/
 */
router.post(
  '/',
  requestValidator(extensionValidationSchema.create),
  extensionController.create
);

/**
 * DELETE /api/guest-extension/:extensionId
 */
router.delete('/:extensionId', extensionController.deleteExtension);

/**
 * PUT /api/guest-extension/:extensionId
 */
router.put(
  '/:extensionId',
  requestValidator(extensionValidationSchema.update),
  extensionController.updateExtension
);

/**
 * PUT /api/guest-extension/:extensionId/assign
 */
router.put('/:extensionId/assign', extensionController.assignToExtension);

module.exports = router;
