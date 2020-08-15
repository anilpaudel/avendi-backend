const HttpStatus = require('http-status-codes');
const MongooseError = require('mongoose').Error;

const CustomError = require('../lib/errors/customError');
const NotFoundError = require('../lib/errors/notFound');
const ForbiddenError = require('../lib/errors/forbidden');
const ValidationError = require('../lib/errors/validation');
const AuthenticationError = require('../lib/errors/authentication');
const ServiceUnavailableError = require('../lib/errors/serviceUnavailable');

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
  // Validation errors
  console.log(err);
  if (err.isJoi) {
    const response = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
    };

    if (process.env.NODE_ENV.toLowerCase() === 'dev') {
      response.details =
        err.details &&
        err.details.map((err) => {
          return {
            message: err.message,
            param: err.path.join('.'),
          };
        });
    }

    return response;
  }

  // client payload verification error by mongoose schema.
  if (err instanceof MongooseError.ValidationError) {
    const response = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details: Object.entries(err.errors).map((value) => {
        return {
          field: value[0],
          message: value[1].message,
          kind: value[1].kind,
        };
      }),
    };

    return response;
  }

  // implicit cast error of mongoose
  if (err instanceof MongooseError.CastError) {
    const response = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
    };

    return response;
  }

  // duplication error in schema
  if (err.name === 'MongoError' && err.code === 11000) {
    const response = {
      code: HttpStatus.CONFLICT,
      message:
        HttpStatus.getStatusText(HttpStatus.CONFLICT) + ': duplicate entries.',
    };

    return response;
  }

  // Custom errors
  if (err.isCustom) {
    if (err instanceof AuthenticationError) {
      return {
        code: HttpStatus.UNAUTHORIZED,
        message:
          err.message || HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
      };
    }

    if (err instanceof ForbiddenError) {
      return {
        code: HttpStatus.FORBIDDEN,
        message: err.message || HttpStatus.getStatusText(HttpStatus.FORBIDDEN),
      };
    }

    if (err instanceof ValidationError) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message:
          err.message || HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      };
    }

    if (err instanceof ServiceUnavailableError) {
      return {
        code: HttpStatus.SERVICE_UNAVAILABLE,
        message:
          err.message ||
          HttpStatus.getStatusText(HttpStatus.SERVICE_UNAVAILABLE),
      };
    }

    if (err instanceof NotFoundError) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: err.message || HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      };
    }

    if (err instanceof CustomError) {
      return {
        code: err.code || HttpStatus.BAD_REQUEST,
        message:
          err.message || HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
        details: err.details,
      };
    }

    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        err.message ||
        HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  };
}

module.exports = buildError;
