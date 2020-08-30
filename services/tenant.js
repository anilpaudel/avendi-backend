const config = require('../config/env');
const Tenant = require('../models/tenant');
const { uploadToS3 } = require('../utils/uploadToS3');
const { addTimestampToFilename } = require('../utils/string');
const CustomError = require('../lib/errors/customError');
const NotFoundError = require('../lib/errors/notFoundError');

exports.fetchByTenantName = (tenantName) => Tenant().fetchByName(tenantName);

exports.updateTenant = async (tenantName, updateData, file) => {
  const tenant = await Tenant().updateByTenantName(tenantName, updateData);

  if (!file) {
    return tenant;
  }

  return uploadHotelImage(tenantName, file);
};

const uploadHotelImage = async function (tenantName, file) {
  try {
    const findTenant = await Tenant().fetchByName(tenantName);
    if (!findTenant) {
      throw new NotFoundError();
    }

    const imageBucketName = config.aws.imageBucketName;
    const folderName = config.aws.imageFolder;
    const filename = addTimestampToFilename(file.originalname);

    const uploadImageUrl = await uploadToS3(
      imageBucketName,
      file.buffer,
      folderName ? `${folderName}/${filename}` : `${filename}`
    );

    const tenant = await Tenant().updateByTenantName(tenantName, {
      imageUrl: uploadImageUrl,
    });

    return tenant;
  } catch (err) {
    if (err.statusCode === 403) {
      throw new CustomError('Image upload access denied.', 403);
    }
    throw err;
  }
};

exports.uploadHotelImage = uploadHotelImage;
