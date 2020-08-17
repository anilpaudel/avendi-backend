const { Router } = require('express');

const extensionRateController = require('../controllers/extensionRate');
const validateRequest = require('../middleware/requestValidator');
const extensionRateValidationSchema = require('../validators/extensionRateValidator');

const router = Router();

/**
 * GET /api/extension-rate/
 */
router.get('/', extensionRateController.fetchAll);

/**
 * GET /api/extension-rate/:extensionRateId
 */
router.get('/:extensionRateId', extensionRateController.fetchById);

/**
 * POST /api/extension-rate/
 */
router.post(
  '/',
  validateRequest(extensionRateValidationSchema.create),
  extensionRateController.create
);

/**
 * DELETE /api/extension-rate/:extensionRateId
 */
router.delete('/:extensionRateId', extensionRateController.deleteExtensionRate);

/**
 * PUT /api/extension-rate/:extensionRateId
 */
router.put(
  '/:extensionRateId',
  validateRequest(extensionRateValidationSchema.update),
  extensionRateController.updateExtensionRate
);

module.exports = router;
