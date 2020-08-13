const HttpStatus = require('http-status-codes');

const buildError = require('../utils/buildError');

/**
 * Method not allowed error middleware. This middleware should be placed at
 * the very bottom of the middleware stack.
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.methodNotAllowed = function (req, res) {
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
    error: {
      code: HttpStatus.METHOD_NOT_ALLOWED,
      message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
    },
  });
};

/**
 * To handle errors from body parser for cases such as invalid JSON sent through
 * the body (https://github.com/expressjs/body-parser#errors).
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
exports.bodyParser = function (err, req, res, next) {
  res.status(err.status).json({
    error: {
      code: err.status,
      message: HttpStatus.getStatusText(err.status),
    },
  });
};

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
exports.genericErrorHandler = function (err, req, res, next) {
  const error = buildError(err);

  res.status(error.code).json({ error });
};
