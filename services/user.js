const bcrypt = require('bcryptjs');

const User = require('../models/user');
const AuthenticationError = require('../lib/errors/authentication');
const authMessage = require('../constants/messages').AUTH;

exports.createUser = function (payload) {
  try {
    const userData = {
      ...payload,
      password: bcrypt.hashSync(payload.password),
    };

    return User.save(userData);
  } catch (err) {
    console.log(err);
  }
};

exports.fetchAll = () => User.fetchAll();

exports.authenticate = async function (email, password) {
  const user = await User.fetchByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AuthenticationError(authMessage.incorrectPassword);
  }

  return user;
};
