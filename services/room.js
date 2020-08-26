const Room = require('../models/room');
const AuthenticationError = require('../lib/errors/authentication');
const NotFoundError = require('../lib/errors/notFoundError');
//const authMessage = require('../constants/messages').AUTH;

exports.createRoom = function (payload) {
  try {
    const roomData = {
      ...payload,
    };

    return Room().save(roomData);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = () => Room().fetchAll();

exports.fetchById = async (roomId) => {
  const room = await Room().fetchById(roomId);

  if (!room) {
    throw new NotFoundError();
  }

  return room;
};

exports.updateRoom = async (roomId, updateData) => {
  const room = await Room().updateById(roomId, updateData);

  if (!room) {
    throw new NotFoundError();
  }

  return room;
};

exports.deleteRoom = async (roomId) => {
  const room = await Room().deleteById(roomId);

  if (!room) {
    throw new NotFoundError();
  }
};
