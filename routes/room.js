const { Router } = require('express');

const roomController = require('../controllers/room');

const router = Router();

/**
 * GET /api/room/
 */
router.get('/', roomController.fetchAll);

/**
 * GET /api/room/:roomID
 */
router.get('/:roomID', roomController.fetchById);

/**
 * POST /api/room/
 */
router.post('/', roomController.create);

/**
 * DELETE /api/room/:roomID
 */
router.delete('/:roomID', roomController.deleteRoom);

/**
 * PUT /api/room/:roomID
 */
router.put('/:roomID', roomController.updateRoom);

module.exports = router;
