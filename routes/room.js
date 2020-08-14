const { Router } = require('express');

const roomController = require('../controllers/room');

const router = Router();

/**
 * GET /api/room/
 */
router.get('/', roomController.fetchAll);

/**
 * GET /api/room/:roomId
 */
router.get('/:roomId', roomController.fetchById);

/**
 * POST /api/room/
 */
router.post('/', roomController.create);

/**
 * DELETE /api/room/:roomId
 */
router.delete('/:roomId', roomController.deleteRoom);

/**
 * PUT /api/room/:roomId
 */
router.put('/:roomId', roomController.updateRoom);

module.exports = router;
