const { Router } = require('express');

const userController = require('../controllers/user');
const validateRequest = require('../middleware/requestValidator');
const userValidationSchema = require('../validators/userValidator');

const router = Router();

/**
 * GET /api/user/
 */
router.get('/', userController.fetchAll);

/**
 * GET /api/user/:userId
 */
router.get('/:userId', userController.fetchById);

/**
 * POST /api/user/
 */
router.post(
  '/',
  validateRequest(userValidationSchema.create),
  userController.create
);

/**
 * DELETE /api/user/:userId
 */
router.delete('/:userId', userController.deleteUser);

/**
 * PUT /api/user/:userId
 */
router.put(
  '/:userId',
  validateRequest(userValidationSchema.update),
  userController.updateUser
);

module.exports = router;
