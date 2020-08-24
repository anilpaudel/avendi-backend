const ForbiddenError = require('../lib/errors/forbidden');

/**
 * Middleware to check if the user has role as mentioned.
 *
 * @param {Array} user_roles The schema to validate against.
 * @returns {Promise}
 */
module.exports = function validateUserType(user_roles) {
  return async (req, _, next) => {
    try {
      const role = req.currentUser.type;

      if (!user_roles.includes(role)) {
        throw new ForbiddenError();
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
