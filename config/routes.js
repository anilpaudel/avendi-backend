/**
 * @overview routes
 * Application Routing
 */
const { Router } = require('express');

// unclassified routes
const auth = require('../controllers/auth');
const authenticateUser = require('../middleware/authenticate').authenticateUser;
const tenantHandler = require('../middleware/tenantHandler').tenantHandler;
const userRoutes = require('../routes/user');
const roomRoutes = require('../routes/room');
const serviceRoutes = require('../routes/service');
const bookingRoutes = require('../routes/booking');
const feedbackRoutes = require('../routes/feedback');
const foodMenuRoutes = require('../routes/foodMenu');
const menuCategoryRoutes = require('../routes/menuCategory');
const requestRoutes = require('../routes/guestRequest');
const extensionRoutes = require('../routes/guestExtension');
const extensionRateRoutes = require('../routes/extensionRate');
const adminRoutes = require('../routes/admin');

const userController = require('../controllers/user');
const validateRequest = require('../middleware/requestValidator');
const userValidationSchema = require('../validators/userValidator');

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

publicRouter.use('/admin', adminRoutes);


/**
 * Contains secured API routes for the application.
 */
const privateRouter = Router();

/**
 * Authentication middleware for private routes.
 */
privateRouter.use(tenantHandler);
/**
 * POST /api/auth/login
 */
privateRouter.post('/auth/login', auth.login);
privateRouter.post('/auth/refresh', auth.refresh);
privateRouter.use(authenticateUser); // authentication middleware.
privateRouter.use('/user', userRoutes);

privateRouter.use('/room', roomRoutes);
privateRouter.use('/booking', bookingRoutes);
privateRouter.use('/service', serviceRoutes);
privateRouter.use('/feedback', feedbackRoutes);
privateRouter.use('/guest-request', requestRoutes);
privateRouter.use('/guest-extension', extensionRoutes);
privateRouter.use('/extension-rate', extensionRateRoutes);
privateRouter.use('/food-menu', foodMenuRoutes);
privateRouter.use('/menu-category', menuCategoryRoutes);

// instant routes no need for separate routes file
privateRouter.get('/team', userController.fetchAllTeam);

module.exports = { publicRouter, privateRouter };
