const { Router } = require('express');

const requestController = require('../controllers/request');
const validateUserType = require('../middleware/roleValidator');
const { USER_TYPE } = require('../constants/user');
const requestValidator = require('../middleware/requestValidator');
const requestValidationSchema = require('../validators/guestRequestValidator');

const router = Router();

const tempController = (req, res) =>
  res.status(200).json({ message: 'Route Working. Need to implement!' });

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
  validateUserType([USER_TYPE.GUEST]),
  requestValidator(requestValidationSchema.update),
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

module.exports = router;
