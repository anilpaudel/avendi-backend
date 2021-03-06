const BaseError = require('./baseError');

/**
 * Error class for Forbidden Error.
 */
class ForbiddenError extends BaseError {
  /**
   * Constructor for ForbiddenError.
   *
   * @param {String} message
   * @returns {ForbiddenError}
   */
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Forbidden Error: ${this.message}`;
  }
}

module.exports =  ForbiddenError;
