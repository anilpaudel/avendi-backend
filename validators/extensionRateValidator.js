const Joi = require('@hapi/joi');

const create = Joi.object({
  name: Joi.string().label('Name').min(1).required(),
  price: Joi.string().label('Price').min(1).required(),
});
const update = Joi.object({
  name: Joi.string().label('Name').min(1).optional(),
  price: Joi.string().label('Price').min(1).optional(),
});

module.exports = {
  create,
  update,
};
