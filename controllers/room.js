const HttpStatus = require('http-status-codes');

const roomService = require('../services/room');

/**
 * Add room.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.create = async (req, res, next) => {
  try {
    const data = await roomService.createRoom(req.body);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all rooms.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchAll = async (req, res, next) => {
  try {
    const data = await roomService.fetchAll();

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Get room by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchById = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const data = await roomService.fetchById(roomId);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Update room by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.updateRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const updatePayload = req.body;

    const data = await roomService.updateRoom(roomId, updatePayload);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete room by ID.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.deleteRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    await roomService.deleteRoom(roomId);

    res.status(HttpStatus.OK);
  } catch (err) {
    next(err);
  }
};
