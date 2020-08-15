const Joi = require('@hapi/joi');
const { ROOM_TYPES } = require('../constants/room');

const create = Joi.object({
  number: Joi.number().label('Room number').positive().integer().required(),
  description: Joi.string()
    .label('Description')
    .trim()
    .min(1)
    .max(500)
    .required(),
  type: Joi.string()
    .label('type')
    .valid(...Object.keys(ROOM_TYPES).map((key) => ROOM_TYPES[key]))
    .required(),
});

const update = Joi.object({
  number: Joi.number().label('Room number').positive().integer(),
  description: Joi.string().label('Description').trim().min(1).max(500),
  type: Joi.string()
    .label('type')
    .valid(...Object.keys(ROOM_TYPES).map((key) => ROOM_TYPES[key])),
});

module.exports = {
  create,
  update,
};
