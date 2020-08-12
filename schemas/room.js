module.exports = {
  number: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
  },
  type: { type: String, required: true }, // I think we can use enum here too.
};
