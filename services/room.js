
const Room = require('../models/room');
const AuthenticationError = require('../lib/errors/authentication');
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

exports.fetchById = (roomId) => Room().fetchById(roomId);

exports.updateRoom = (roomId, updateData) =>
  Room().updateById(roomId, updateData);

exports.deleteRoom = (roomId) => Room().deleteById(roomId)
