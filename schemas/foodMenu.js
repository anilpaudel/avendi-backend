
module.exports = {
  price: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, maxLength: 500 },
  image: { type: Buffer, contentType: String },
};
