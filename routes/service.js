const { Router } = require('express');

const serviceController = require('../controllers/service');

const router = Router();

/**
 * GET /api/service/
 */
router.get('/', serviceController.fetchAll);

/**
 * GET /api/service/:serviceId
 */
router.get('/:serviceId', serviceController.fetchById);

/**
 * POST /api/service/
 */
router.post('/', serviceController.create);

/**
 * DELETE /api/service/:serviceId
 */
router.delete('/:serviceId', serviceController.deleteService);

/**
 * PUT /api/service/:serviceId
 */
router.put('/:serviceId', serviceController.updateService);

module.exports = router;
