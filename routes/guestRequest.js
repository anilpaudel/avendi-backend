const { Router } = require('express');

const { USER_TYPE } = require('../constants/user');
const requestController = require('../controllers/guestRequest');
const validateUserType = require('../middleware/roleValidator');
const requestValidator = require('../middleware/requestValidator');
const requestValidationSchema = require('../validators/guestRequestValidator');

const router = Router();

/**
 * GET /api/request/
 */
router.get('/', requestController.fetchAll);

/**
 * GET /api/request/:requestId
 */
router.get('/:requestId', requestController.fetchById);

/**
 * POST /api/request/
 */
router.post(
  '/',
  requestValidator(requestValidationSchema.create),
  requestController.create
); //only guest can create request

/**
 * DELETE /api/request/:requestId
 */
router.delete('/:requestId', requestController.deleteRequest);

/**
 * PUT /api/request/:requestId
 */
router.put(
  '/:requestId',
  requestValidator(requestValidationSchema.update),
  requestController.updateRequest
);

/**
 * PUT /api/request/:requestId/assign
 */
router.put(
  '/:requestId/assign',
  requestController.assignToRequest
);

module.exports = router;
