const bcrypt = require('bcryptjs');

const User = require('../models/user');
const AuthenticationError = require('../lib/errors/authentication');
const user = require('../models/user');
const authMessage = require('../constants/errorMessages').AUTH;

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

exports.fetchById = (userId) => User.fetchById(userId);

exports.authenticate = async function (email, password) {
  const user = await User.fetchByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AuthenticationError(authMessage.incorrectPassword);
  }

  return user;
};

exports.updateUser = (userId, updateData) =>
  User.updateById(userId, updateData);

exports.deleteUser = (userId) => User.deleteById(userId)
