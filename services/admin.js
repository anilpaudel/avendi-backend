const bcrypt = require('bcryptjs');

const Tenant = require('../models/tenant');
const User = require('../models/user');
const Counter = require('../models/counter');
const Staff = require('../models/staff');
const authMessage = require('../constants/errorMessages').AUTH;
const AuthenticationError = require('../lib/errors/authentication');
const ValidationError = require('../lib/errors/validation');
const { TENANT } = require('../constants/errorMessages');
const { setCurrentTenant } = require('../utils/storage');

exports.createTenant = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return Tenant().save(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = () => Tenant().fetchAll();

exports.fetchByTenantName = (tenantName) => Tenant().fetchByName(tenantName);

exports.updateTenant = (id, updateData) => Tenant().updateById(id, updateData);

exports.deleteTenant = (tenantName) => Tenant().deleteByTenantName(tenantName);

exports.createAdmin = async function createUser(payload) {
  try {
    const userData = {
      ...payload,
      password: bcrypt.hashSync(payload.password),
    };

    const user = await User().save(userData);

    return user;
  } catch (err) {
    throw err;
  }
};

exports.createUser = async function createUser(payload) {
  try {
    const { tenant } = payload;
    const tenantData = await Tenant().fetchByName(tenant);
    if (!tenantData) {
      throw new ValidationError(TENANT.invalidTenant);
    }

    setCurrentTenant(tenant);

    const userData = {
      ...payload,
      password: bcrypt.hashSync(payload.password),
    };

    const user = await User().save(userData);

    const staffCounter = await Counter().fetchStaffCounter();
    const staffData = {
      userId: user._id,
      department: userData.department,
      staffId: staffCounter.count,
    };

    const staff = await Staff().save(staffData);

    const userObject = user.toJSON();

    return {
      ...userObject,
      staffId: staff.staffId,
      department: staff.department,
    };
  } catch (err) {
    throw err;
  }
};

// exports.fetchAll = function fetchAll() {
//   return SuperUser().fetchAll();
// };

// exports.fetchById = function fetchById(userId) {
//   return SuperUser().fetchById(userId);
// };

// exports.authenticate = async function authenticate(email, password) {
//   const user = await SuperUser().fetchByEmail(email);

//   if (!user || !bcrypt.compareSync(password, user.password)) {
//     throw new AuthenticationError(authMessage.incorrectPassword);
//   }

//   return user;
// };

// function updateUser(userId, updateData) {
//   return SuperUser().updateById(userId, updateData);
// }

// function deleteUser(userId) {
//   return SuperUser().deleteById(userId);
// }

// async function uploadUserImage(userId, file) {
//   try {
//     const imageBucketName = config.aws.imageBucketName;
//     const folderName = config.aws.imageFolder;
//     const filename = addTimestampToFilename(file.originalname);

//     const uploadImageUrl = await uploadToS3(
//       imageBucketName,
//       file.buffer,
//       folderName ? `${folderName}/${filename}` : `${filename}`
//     );

//     const user = await SuperUser().updateById(userId, {
//       imageUrl: uploadImageUrl,
//     });

//     return user;
//   } catch (err) {
//     if (err.statusCode === 403) {
//       throw new CustomError('Image upload access denied.', 403);
//     }
//     throw err;
//   }
// }
