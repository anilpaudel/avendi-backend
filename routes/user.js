const { Router } = require('express');

const userController = require('../controllers/user');

const router = Router();

const tempController = (req, res) => {
  throw new Error();
  res.status(200).json({ message: 'Route Working. Need to implement!' });
};
/**
 * GET /api/user/
 */
router.get('/', userController.fetchAll);

/**
 * GET /api/user/:userId
 */
router.get('/:userId', tempController);

/**
 * POST /api/user/
 */
router.post('/', userController.create);

/**
 * DELETE /api/user/:userId
 */
router.delete('/:userId', tempController);

/**
 * PUT /api/user/:userId
 */
router.put('/:userId', tempController);

module.exports = router;
