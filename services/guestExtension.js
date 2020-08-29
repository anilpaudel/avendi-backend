const User = require('../models/user');
const Booking = require('../models/booking');
const { USER_TYPE } = require('../constants/user');
const Extension = require('../models/guest_extension');
const ExtensionRate = require('../models/extension-rate');
const ValidationError = require('../lib/errors/validation');
const NotFoundError = require('../lib/errors/notFoundError');

exports.createExtension = async function (payload, guestId) {
  try {
    const data = {
      ...payload,
    };

    const guest = await User().fetchById(guestId);

    if (!guest || guest.type !== USER_TYPE.GUEST) {
      throw new ValidationError('Invalid guest Id provided.');
    }

    if (data && data.assignTo) {
      const assignee = await User().fetchById(data.assignTo);

      if (!assignee || (assignee && assignee.type === USER_TYPE.GUEST)) {
        throw new ValidationError('Invalid AssignTo id provided.');
      }
    }

    const currentBooking = await Booking().findActiveBooking(guestId);

    if (!currentBooking) {
      throw new ValidationError('No active booking found.');
    }

    if (new Date(data.extendedTo) < currentBooking.dateCheckout) {
      throw new ValidationError('Invalid extension date');
    }

    const extensionRate = await ExtensionRate().fetchById(data.rateId);
    if (!extensionRate) {
      throw new ValidationError('Invalid extension rate provided.');
    }

    return Extension().save({ ...data, bookingId: currentBooking._id });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = () => Extension().fetchAll();

exports.fetchById = async (extensionId) => {
  const extension = await Extension().fetchById(extensionId);
  if (!extension) {
    throw new NotFoundError();
  }

  return extension;
};

exports.updateExtension = async (extensionId, updateData) => {
  if (updateData.rateId) {
    const extensionRate = await ExtensionRate().fetchById(updateData.rateId);
    if (!extensionRate) {
      throw new ValidationError('Invalid extension rate provided.');
    }
  }
  const extension = await Extension().updateById(extensionId, updateData);

  if (!extension) {
    throw new NotFoundError();
  }

  return extension;
};

exports.assignStaffToExtension = async function (extensionId, staffId) {
  const user = await User().fetchById(staffId);

  if (!user || (user && user.type === USER_TYPE.GUEST)) {
    throw new ValidationError('Invalid AssignTo id provided.');
  }

  const extension = await Extension().updateById(extensionId, {
    assignTo: staffId,
  });

  if (!extension) {
    throw new NotFoundError();
  }

  return extension;
};

exports.deleteExtension = async (extensionId) => {
  const extension = await Extension().deleteById(extensionId);
  if (!extension) {
    throw new NotFoundError();
  }
};
