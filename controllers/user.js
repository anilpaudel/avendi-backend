const HttpStatus = require('http-status-codes');

const userService = require('../services/user');

/**
 * Add user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.create = async (req, res, next) => {
  try {
    console.log(req.body)
    const data = await userService.createUser(req.body);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const data = await userService.fetchAll();

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};
