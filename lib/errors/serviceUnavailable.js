const BaseError = require('./baseError');

/**
 * Error class for service failure and error.
 */
class ServiceUnavailableError extends BaseError {
  /**
   * Constructor for ServiceUnavailableError.
   *
   * @param {String} message
   * @returns {ServiceUnavailableError}
   */
  constructor(message) {
    super(message);
    this.name = 'ServiceUnavailableError';
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Service Unavailable Error: ${this.message}`;
  }
}

module.exports =  ServiceUnavailableError;
