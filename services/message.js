
const Message = require('../models/message');

exports.createMessage = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return Message.save(data);
  } catch (err) {
    console.log(err);
  }
};

exports.fetchAll = (staffId, guestId) => Message.fetchAll(staffId, guestId);

exports.fetchById = (messageId) => Message.fetchById(messageId);

exports.deleteRoom = (messageId) => Room.deleteById(messageId)
