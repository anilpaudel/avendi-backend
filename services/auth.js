const jwt = require('../utils/jwt');

const config = require('../config/env');
const User = require('../models/user');
const RefreshToken = require('../models/refresh_token');
const authMessage = require('../constants/errorMessages').AUTH;
const parseSecond = require('../utils/jwt').parseJwtTimeToSecond;
const AuthenticationError = require('../lib/errors/authentication');

/**
 * Generates access token and refresh token.
 * Insert refresh token into the database.
 *
 * @param {Object} data
 * @returns {String}
 */
async function generateAccessAndRefreshTokens(data) {
  const oldRefreshToken = await RefreshToken.findActiveToken(data._id);

  if (oldRefreshToken) {
    await revoke(oldRefreshToken.token);
  }
  const refreshTokenData = { data: data, isRefreshToken: true };
  const accessTokenData = { data: data };

  const accessToken = jwt.createToken(accessTokenData);
  const refreshToken = jwt.createRefreshToken(refreshTokenData);

  await RefreshToken.save({
    userId: data.id,
    token: refreshToken,
    expiresAt: new Date(
      Date.now() + parseSecond(config.jwt.refreshTokenSignOptions.expiresIn)
    ),
  });

  return {
    accessToken,
    refreshToken,
    userInfo: data,
  };
}

/**
 * Refresh token.
 *
 * @param {Object} data - Client key se.
 * @returns {String}
 */
async function refreshToken(token) {
  const data = jwt.verifyRefreshToken(
    token,
    config.jwt.refreshSecret,
    config.jwt.refreshTokenSignOptions
  );

  const user = await verifyDecodedToken(data);
  const accessToken = await generateAccessToken(user);

  return {
    accessToken,
    user,
  };
}

/**
 * Verify token consitency.
 *
 * @param {Object} data
 * @returns {String}
 */
async function verifyDecodedToken(data) {
  const user = await User.fetchById(data.data._id);

  if (!user) {
    throw new AuthenticationError(authMessage.invalid);
  }
  return user;
}

/**
 * Generate access token.
 *
 * @param {Object} data - Client key se.
 * @returns {String}
 */
async function generateAccessToken(data) {
  const accessToken = jwt.createToken({ data });

  return accessToken;
}

/**
 * Revoke refresh token.
 *
 * @param {String} token
 */
async function revoke(token) {
  await RefreshToken.revokeToken(token);
}

module.exports = {
  revoke,
  refreshToken,
  verifyDecodedToken,
  generateAccessToken,
  generateAccessAndRefreshTokens,
};
