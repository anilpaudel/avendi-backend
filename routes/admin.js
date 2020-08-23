const { Router } = require('express');

const adminController = require('../controllers/admin');

const router = Router();

/**
 * GET /api/admin/tenant
 */
router.get('/tenant', adminController.fetchAllTenant);

/**
 * GET /api/admin
 */
// router.get('/:userId', userController.fetchById);

/**
 * POST /api/admin/tenant
 */
router.post('/tenant', adminController.createTenant);

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
