const { version, title, description } = require('../package.json');

const config = {
  app: {
    name: title,
    description: description,
    version: version,
    port: process.env.PORT || 3000,
    host: process.env.APP_HOST || '0.0.0.0',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    signOptions: {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRE,
    },
    refreshTokenSignOptions: {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    },
  },
  aws: {
    accessConfig: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    imageBucketName: process.env.BUCKET_NAME,
    imageFolder: process.env.IMAGE_FOLDER,
  },
};

module.exports = config;
