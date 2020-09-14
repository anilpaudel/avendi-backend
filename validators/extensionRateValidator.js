const Joi = require('@hapi/joi');

const create = Joi.object({
  name: Joi.string().label('Name').min(1).required(),
  price: Joi.number().label('Price').min(0).required(),
  currency: Joi.string().label('Currency').min(1).required(),
});
const update = Joi.object({
  name: Joi.string().label('Name').min(1).optional(),
  price: Joi.number().label('Price').min(0).optional(),
  currency: Joi.string().label('Currency').min(1).optional(),
});

module.exports = {
  create,
  update,
};
