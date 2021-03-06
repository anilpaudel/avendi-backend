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
    const data = await userService.createUser(req.body, req.file);

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
    const data = await userService.fetchAll(req.query);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all team members.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchAllTeam = async (req, res, next) => {
  try {
    const data = await userService.fetchAllTeam(req.query);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get user by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const data = await userService.fetchById(userId);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Update user by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatePayload = req.body;

    const data = await userService.updateUser(userId, updatePayload, req.file);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete user by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    await userService.deleteUser(userId);

    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
};

/**
 * Upload image to user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.uploadImage = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const file = req.file;

    const data = await userService.uploadUserImage(userId, file);

    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    next(err);
  }
};
