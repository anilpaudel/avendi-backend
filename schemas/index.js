const { Schema } = require('mongoose');

/**
 * Create a mongoose schema with given options.
 *
 * @param {Object} schema
 * @param {Object} options
 *
 * @returns {Schema}
 */
exports.createSchema = (schema, options = {}) => {
  return new Schema(schema, options);
};

exports.collectionNames = {
  USER: 'user',
  FEEDBACK: 'Feedback',
  MESSAGE: 'Message',
  BOOKING: 'Booking',
  ROOM: 'Room',
  GUEST_EXTENSION: 'GuestExtension',
  SERVICE: 'Service',
  GUEST_REQUEST: 'GuestRequest',
  FOOD_MENU: 'FoodMenu',
  MENU_CATEGORY: 'MenuCategory',
  REFRESH_TOKEN: 'refreshToken',
  STAFF: 'staff',
  COUNTER: 'counter',
  EXTENSION_RATE: 'extensionRate'
};
