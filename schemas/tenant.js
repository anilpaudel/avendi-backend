const { createSchema } = require('.');

module.exports = createSchema({
  tenant: { type: String, unique: true, required: true },
  hotelName: { type: String, required: true },
  hotelId: { type: String, unique: true, required: true },
  image: { type: String },
});
