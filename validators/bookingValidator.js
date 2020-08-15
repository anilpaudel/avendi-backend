const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const { BOOKING_STATUS } = require('../constants/booking');

const Joi = BaseJoi.extend(Extension);

const create = Joi.object({
  roomId: Joi.string().label('Room ID').trim().required(),
  guestId: Joi.string().label('Guest Id').trim().required(),
  description: Joi.string().label('Description').required(),
  dateCheckin: Joi.date().label('Checkin Date').required(),
  dateCheckout: Joi.date()
    .label('Checkout Date')
    .disallow(Joi.ref('dateCheckin'))
    .greater(Joi.ref('dateCheckin'))
    .required(),
  creditCard: Joi.boolean()
    .truthy('yes')
    .falsy('no')
    .allow('yes', 'no')
    .required(),
  status: Joi.string()
    .label('Booking Status')
    .valid(...Object.keys(BOOKING_STATUS).map((key) => BOOKING_STATUS[key]))
    .required(),
});

const update = Joi.object({
  roomId: Joi.string().label('Room ID').trim(),
  description: Joi.string().label('Description'),
  dateCheckin: Joi.date().label('Checkin Date'),
  dateCheckout: Joi.when('dateCheckin', {
    is: Joi.exist(),
    then: Joi.date().greater(Joi.ref('dateCheckin')),
    otherwise: Joi.date(),
  }).label('Checkout Date'),
  creditCard: Joi.boolean()
    .label('Credit card?')
    .truthy('yes')
    .falsy('no')
    .allow('yes', 'no'),
  status: Joi.string()
    .label('Booking Status')
    .valid(...Object.keys(BOOKING_STATUS).map((key) => BOOKING_STATUS[key])),
});

module.exports = {
  create,
  update,
};
