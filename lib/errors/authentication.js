const BaseError = require('./baseError');

/**
 * Error class for Authentication Error.
 */
class AuthenticationError extends BaseError {
  /**
   * Constructor for Authentication.
   *
   * @param {String} message
   * @returns {AuthenticationError}
   */
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Token Error: ${this.message}`;
  }
}

export default AuthenticationError;
