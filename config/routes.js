/**
 * @overview routes
 * Application Routing
 */
const { Router } = require('express');

// unclassified routes
const auth = require('../controllers/auth');
const authenticateUser = require('../middleware/authenticate');

const userRoutes = require('../routes/user');
const roomRoutes = require('../routes/room');
const serviceRoutes = require('../routes/service');
const bookingRoutes = require('../routes/booking');
const categoryRoutes = require('../routes/category');
const feedbackRoutes = require('../routes/feedback');
const foodMenuRoutes = require('../routes/foodMenu');
const requestRoutes = require('../routes/guestRequest');
const extensionRoutes = require('../routes/guestExtension');

/**
 * Contains public API routes for the application.
 */
const publicRouter = Router();

/**
 * GET /api
 */
publicRouter.get('/', (_, res) => {
  res.status(200).json({ message: 'Avendi Backend' });
});

/**
 * POST /api/auth/login
 */
publicRouter.post('/auth/login', auth.login);

/**
 * Contains secured API routes for the application.
 */
const privateRouter = Router();

/**
 * Authentication middleware for private routes.
 */
privateRouter.use(authenticateUser);

privateRouter.use('/user', userRoutes);
privateRouter.use('/room', roomRoutes);
privateRouter.use('/booking', bookingRoutes);
privateRouter.use('/service', serviceRoutes);
privateRouter.use('/request', requestRoutes);
privateRouter.use('/category', categoryRoutes);
privateRouter.use('/feedback', feedbackRoutes);
privateRouter.use('/extension', extensionRoutes);

module.exports = {publicRouter, privateRouter}