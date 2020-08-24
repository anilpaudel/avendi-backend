const { Router } = require('express');

const adminController = require('../controllers/admin');
const authController = require('../controllers/auth');

const validateRequest = require('../middleware/requestValidator');
const adminUserValidationSchema = require('../validators/adminUserValidator');
const { authenticateUser } = require('../middleware/authenticate');
const requestValidator = require('../middleware/requestValidator');

const router = Router();
/**
 * POST /api/admin/login
 */
router.post('/login', authController.login);

/**
 * POST /api/admin/login
 */
router.post('/refresh', authController.refresh);

/**
 * POST /api/admin/
 */
router.post('/', adminController.createAdmin);

router.use(authenticateUser);

/**
 * GET /api/admin/tenant
 */
router.get('/tenant', adminController.fetchAllTenant);

/**
 * POST /api/admin/tenant
 */
router.post('/tenant', adminController.createTenant);

/**
 * POST /api/admin/user
 */
router.post(
  '/user',
  requestValidator(adminUserValidationSchema.create),
  adminController.createUser
);

/**
 * GET /api/admin
 */
// router.get('/:userId', userController.fetchById);

// /**
//  * DELETE /api/user/:userId
//  */
// router.delete('/:userId', userController.deleteUser);

// /**
//  * PUT /api/user/:userId
//  */
// router.put(
//   '/:userId',
//   validateRequest(userValidationSchema.update),
//   userController.updateUser
// );

// /**
//  * POST /api/:userId/image
//  */
// router.post(
//   '/:userId/image',
//   parseMultiPartFormData,
//   userController.uploadImage
// );

module.exports = router;
