const jwt = require('jsonwebtoken');

const config = require('../config/env');
const tokenMessage = require('../constants/errorMessages').AUTH;
const AuthenticationError = require('../lib/errors/authentication');

/**
 * Create token.
 *
 * @param {Object} data - Data to be tokenized.
 * @returns {String}
 */
exports.createToken = function (data) {
  try {
    const token = jwt.sign(data, config.jwt.secret, config.jwt.signOptions);

    return token;
  } catch (err) {
    console.log(err);
    throw new AuthenticationError(tokenMessage.createError);
  }
};

exports.parseJwtTimeToSecond = function (data) {
  const type = data[data.length - 1];
  const value = parseInt(data);
  switch (type) {
    case 'm':
      return value * 1000 * 60;
    case 'h':
      return value * 1000 * 60 * 60;
    case 'd':
      return value * 1000 * 60 * 60 * 24;
  }
};

/**
 * Create refresh token.
 *
 * @param {Object} data - Data to be tokenized.
 * @returns {String}
 */
exports.createRefreshToken = function (data) {
  try {
    const token = jwt.sign(
      data,
      config.jwt.refreshSecret,
      config.jwt.refreshTokenSignOptions
    );

    return token;
  } catch (err) {
    throw new AuthenticationError(tokenMessage.createError);
  }
};

/**
 * Verify token.
 *
 * @param {Object} token - Token to be verified.
 * @returns {Object}
 */
exports.verify = function (token) {
  try {
    const data = jwt.verify(token, config.jwt.secret, config.jwt.signOptions);

    return data;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AuthenticationError(tokenMessage.expired);
    }
    throw new AuthenticationError(tokenMessage.invalid);
  }
};

/**
 * Verify token.
 *
 * @param {Object} token - Token to be verified.
 * @returns {Object}
 */
exports.verifyRefreshToken = function (token) {
  try {
    const data = jwt.verify(token, config.jwt.refreshSecret, config.jwt.refreshTokenSignOptions);

    return data;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AuthenticationError(tokenMessage.expired);
    }
    throw new AuthenticationError(tokenMessage.invalid);
  }
};
