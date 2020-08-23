const config = require('../config/env');
const jwtUtils = require('../utils/jwt');
const authService = require('../services/auth');
const authMessage = require('../constants/errorMessages').AUTH;
const AuthenticationError = require('../lib/errors/authentication');
/**
 * Extract token from headers in http request.
 *
 * @param {Object} headers
 * @returns {Object}
 */
function extractTokenFromHeaders(headers = {}) {
  const { authorization = '' } = headers;

  const [tokenType, token] = authorization.split(' ').filter(Boolean);

  if (tokenType !== 'Bearer' || !token) {
    const tokenError = new AuthenticationError(authMessage.emptyToken);

    console.error(tokenError.toString());
    throw tokenError;
  }

  return token;
}

/**
 * Fetch user from auth server using token.
 *
 * @param {String} token
 * @throws {NetworkError}
 * @returns {Promise}
 */
async function fetchUserByToken(token) {
  const data = jwtUtils.verify(
    token,
    config.jwt.secret,
    config.jwt.signOptions
  );

  return authService.verifyDecodedToken(data);
}

/**
 * Validate token received in header.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
async function authenticateUser(req, res, next) {
  try {
    const token = extractTokenFromHeaders(req.headers);
    const { TENANT } = req.headers;
    const user = await fetchUserByToken(token, TENANT);

    req.token = token;
    req.currentUser = user;
    next();
  } catch (err) {
    next(err);
  }
}

exports.authenticateUser = authenticateUser;
exports.fetchUserByToken = fetchUserByToken;
