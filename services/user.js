const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Staff = require('../models/staff');
const Counter = require('../models/counter');
const AuthenticationError = require('../lib/errors/authentication');
const { USER_TYPE } = require('../constants/user');
const authMessage = require('../constants/errorMessages').AUTH;

exports.createUser = async function (payload) {
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
    console.log(err);
    throw err;
  }
};

exports.fetchAll = () => User.fetchAll();

exports.fetchAllTeam = async function (){
  const staff = await Staff.fetchAll()

  return staff
}

exports.fetchById = (userId) => User.fetchById(userId);

exports.authenticate = async function (email, password) {
  const user = await User.fetchByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AuthenticationError(authMessage.incorrectPassword);
  }

  return user;
};

exports.updateUser = (userId, updateData) =>
  User.updateById(userId, updateData);

exports.deleteUser = (userId) => User.deleteById(userId);
