const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const { ROOM_TYPES } = require('../constants/room');
const BOOKING_STATUS = require('../constants/booking');

const Joi = BaseJoi.extend(Extension);

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
  status: Joi.string()
    .label('type')
    .valid(...Object.keys(BOOKING_STATUS).map((key) => BOOKING_STATUS[key])),
});

const update = Joi.object({
  number: Joi.number().label('Room number').positive().integer(),
  description: Joi.string().label('Description').trim().min(1).max(500),
  type: Joi.string()
    .label('type')
    .valid(...Object.keys(ROOM_TYPES).map((key) => ROOM_TYPES[key])),
  status: Joi.string()
    .label('type')
    .valid(...Object.keys(BOOKING_STATUS).map((key) => BOOKING_STATUS[key])),
});

module.exports = {
  create,
  update,
};
