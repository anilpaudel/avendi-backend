const mongoose = require('../config/database');

const { getCurrentTenant } = require('../utils/storage');

const Model = require('./base_model');
const refreshTokenSchema = require('../schemas/refreshToken');
const { collectionNames, createSchema } = require('../schemas/index');

class RefreshToken extends Model {
  /**
   * This constructs the RefreshToken model with predefined CRUD operations.
   */
  constructor(connection) {
    const schema = refreshTokenSchema;

    schema.virtual('isExpired').get(function () {
      return Date.now() >= this.expiresAt;
    });

    schema.virtual('isActive').get(function () {
      return !this.revoked && !this.isExpired;
    });

    schema.set('toJSON', {
      virtuals: true,
      transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
        delete ret.userId;
      },
    });

    const model = connection.model(collectionNames.REFRESH_TOKEN, schema);

    super(model);
  }

  fetchByToken(token) {
    return this.model.findOne({ token });
  }

  findActiveToken(userId) {
    return this.model.findOne({
      userId,
      revoked: false,
      expiresAt: { $gte: Date.now() },
    });
  }

  revokeToken(token) {
    return this.model.findOneAndUpdate({ token }, { revoked: true });
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();
  if (!tenantConnection) {
    return new RefreshToken(mongoose);
  }

  return new RefreshToken(tenantConnection);
};
