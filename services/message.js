const Message = require('../models/message');
const NotFoundError = require('../lib/errors/notFoundError');

exports.createMessage = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return Message().save(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = (staffId, guestId, filters) =>
  Message().fetchAll(staffId, guestId, filters);

exports.fetchById = async (messageId) => {
  const message = await Message().fetchById(messageId);

  if (!message) {
    throw new NotFoundError();
  }

  return message;
};
