const { createSchema } = require('.');

module.exports = createSchema({
  name: { type: String, maxLength: 50, unique: true },
});
