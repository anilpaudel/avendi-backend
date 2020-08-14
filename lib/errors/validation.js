const BaseError = require('./baseError');

/**
 * Error class for validation error.
 */
class ValidationError extends BaseError {
  /**
   * Constructor for ValidationError.
   *
   * @param {String} message
   * @returns {ValidationError}
   */
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Validation Error: ${this.message}`;
  }
}

module.exports = ValidationError;
