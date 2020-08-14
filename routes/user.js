const { Router } = require('express');

const userController = require('../controllers/user');

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
router.post('/', userController.create);

/**
 * DELETE /api/user/:userId
 */
router.delete('/:userId', userController.deleteUser);

/**
 * PUT /api/user/:userId
 */
router.put('/:userId', userController.updateUser);

module.exports = router;
