const bcrypt = require('bcryptjs');

const User = require('../models/user');
const config = require('../config/env');
const Staff = require('../models/staff');
const Counter = require('../models/counter');
const { USER_TYPE } = require('../constants/user');
const { uploadToS3 } = require('../utils/uploadToS3');
const { addTimestampToFilename } = require('../utils/string');
const authMessage = require('../constants/errorMessages').AUTH;
const AuthenticationError = require('../lib/errors/authentication');
const CustomError = require('../lib/errors/customError');

async function createUser(payload) {
  try {
    const userData = {
      ...payload,
      password: bcrypt.hashSync(payload.password),
    };

    const user = await User.save(userData);

    if (user.type != USER_TYPE.GUEST) {
      const staffCounter = await Counter.fetchStaffCounter();
      const staffData = {
        userId: user._id,
        department: userData.department,
        staffId: staffCounter.count,
      };

      const staff = await Staff.save(staffData);

      const userObject = user.toJSON();

      return {
        ...userObject,
        staffId: staff.staffId,
        department: staff.department,
      };
    }

    return user;
  } catch (err) {
    throw err;
  }
}

function fetchAll() {
  return User.fetchAll();
}

async function fetchAllTeam() {
  const staff = await Staff.fetchAll();

  return staff;
}

function fetchById(userId) {
  return User.fetchById(userId);
}

async function authenticate(email, password) {
  const user = await User.fetchByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AuthenticationError(authMessage.incorrectPassword);
  }

  return user;
}

function updateUser(userId, updateData) {
  return User.updateById(userId, updateData);
}

function deleteUser(userId) {
  return User.deleteById(userId);
}

async function uploadUserImage(userId, file) {
  try {
    const imageBucketName = config.aws.imageBucketName;
    const folderName = config.aws.imageFolder;
    const filename = addTimestampToFilename(file.originalname);

    const uploadImageUrl = await uploadToS3(
      imageBucketName,
      file.buffer,
      folderName ? `${folderName}/${filename}` : `${filename}`
    );

    const user = await User.updateById(userId, { imageUrl: uploadImageUrl });

    return user;
  } catch (err) {
    if (err.statusCode === 403) {
      throw new CustomError('Image upload access denied.', 403);
    }
    throw err;
  }
}

module.exports = {
  createUser,
  fetchAll,
  fetchAllTeam,
  fetchById,
  authenticate,
  updateUser,
  deleteUser,
  uploadUserImage,
};
