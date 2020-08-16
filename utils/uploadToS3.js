const AWS = require('aws-sdk');

const config = require('../config/env');

const s3 = new AWS.S3(config.aws.accessConfig);

/**
 * Upload file to S3 bucket.
 *
 * @param {Object} bucket
 * @param {Object} uploadFile
 * @param {String} fileName
 */
function uploadToS3(bucket, uploadFile, fileName) {
  const params = {
    Bucket: bucket,
    Body: uploadFile,
    Key: fileName,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) {
        return reject(err);
      }

      resolve(data.Location);
    });
  });
}

module.exports = {
  uploadToS3,
};
