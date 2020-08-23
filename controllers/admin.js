const HttpStatus = require('http-status-codes');

const adminService = require('../services/admin');
const userService = require('../services/user');
const { USER_TYPE } = require('../constants/user');
/**
 * Create Tenant.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.createTenant = async (req, res, next) => {
  try {
    const { tenant } = req.body;

    const data = await adminService.createTenant({ tenant });

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Create admin.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.createAdmin = async (req, res, next) => {
  try {
    const body = req.body;
    body.type = USER_TYPE.ADMIN;
    const data = await userService.createUser(body);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all TENANT.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchAllTenant = async (req, res, next) => {
  try {
    const data = await adminService.fetchAll();

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

// /**
//  * Get all team members.
//  *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
// exports.fetchAllTeam = async (req, res, next) => {
//   try {
//     const data = await userService.fetchAllTeam();

//     res.status(HttpStatus.OK).json({ data });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * Get user by ID.
//  *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
// exports.fetchById = async (req, res, next) => {
//   try {
//     const { userId } = req.params;

//     const data = await userService.fetchById(userId);

//     res.status(HttpStatus.OK).json({ data });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * Update user by ID.
//  *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
// exports.updateUser = async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const updatePayload = req.body;

//     const data = await userService.updateUser(userId, updatePayload);

//     res.status(HttpStatus.OK).json({ data });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * Delete user by ID.
//  *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
// exports.deleteUser = async (req, res, next) => {
//   try {
//     const { userId } = req.params;

//     await userService.deleteUser(userId);

//     res.status(HttpStatus.OK).json({});
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * Upload image to user.
//  *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
// exports.uploadImage = async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const file = req.file;

//     const data = await userService.uploadUserImage(userId, file);

//     res.status(HttpStatus.OK).json(data);
//   } catch (err) {
//     next(err);
//   }
// };
