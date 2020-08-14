const config = require('../config/env');
const jwtUtils = require('../utils/jwt');
const AuthenticationError = require('../lib/errors/authentication');
const authMessage = require('../constants/messages').AUTH;

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

  return data;
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
    const user = await fetchUserByToken(token);

    req.token = token;
    req.currentUser = user.data;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authenticateUser;
