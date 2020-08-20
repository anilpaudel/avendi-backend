const User = require('../models/user');
const Booking = require('../models/booking');
const { USER_TYPE } = require('../constants/user');
const Extension = require('../models/guest_extension');
const ExtensionRate = require('../models/extension-rate');
const ValidationError = require('../lib/errors/validation');

exports.createExtension = async function (payload, guestId) {
  try {
    const data = {
      ...payload,
    };

    if (data && data.assignTo) {
      const assignee = await User.fetchById(data.assignTo);

      if (!assignee || (assignee && assignee.type === USER_TYPE.GUEST)) {
        throw new ValidationError('Invalid AssignTo id provided.');
      }
    }

    const currentBooking = await Booking.findActiveBooking(guestId);

    if (!currentBooking) {
      throw new ValidationError('No active booking found.');
    }

    if (new Date(data.extendedTo) < currentBooking.dateCheckout) {
      throw new ValidationError('Invalid extension date');
    }

    const extensionRate = await ExtensionRate.fetchById(data.rateId);
    if (!extensionRate) {
      throw new ValidationError('Invalid extension rate provided.');
    }

    return Extension.save({ ...data, bookingId: currentBooking._id });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = () => Extension.fetchAll();

exports.fetchById = (extensionId) => Extension.fetchById(extensionId);

exports.updateExtension = async (extensionId, updateData) => {
  if (updateData.rateId) {
    const extensionRate = await ExtensionRate.fetchById(updateData.rateId);
    if (!extensionRate) {
      throw new ValidationError('Invalid extension rate provided.');
    }
  }
  return Extension.updateById(extensionId, updateData);
};

exports.assignStaffToExtension = async function (extensionId, staffId) {
  const user = await User.fetchById(staffId);

  if (!user || (user && user.type === USER_TYPE.GUEST)) {
    throw new ValidationError('Invalid AssignTo id provided.');
  }

  return Extension.updateById(extensionId, {
    assignTo: staffId,
  });
};

exports.deleteExtension = (extensionId) => Extension.deleteById(extensionId);
