const Joi = require('@hapi/joi');

const create = Joi.object({
  tenant: Joi.string().label('Tenant Name').min(1).required(),
  hotelName: Joi.string().label('Hotel Name').min(1).required(),
  hotelId: Joi.string().label('Hotel Id').min(1).required(),
});
const update = Joi.object({
  hotelName: Joi.string().label('Hotel Name').min(1).optional(),
  hotelId: Joi.string().label('Hotel Id').min(1).optional(),
});

module.exports = {
  create,
  update,
};
