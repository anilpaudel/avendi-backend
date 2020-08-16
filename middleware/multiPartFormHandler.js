const multer = require('multer');

const { getExtension } = require('../utils/string');
const ValidationError = require('../lib/errors/validation');
const {
  MAX_IMAGE_SIZE,
  VALID_IMAGE_EXTENSIONS,
} = require('../constants/image');

/**
 * Generate multer config options.
 */
function getMulterOptions(storage, maxFileSize, validFileExtensions = []) {
  return {
    storage: storage,
    limits: { fileSize: maxFileSize },
    fileFilter: function (_, file, callback) {
      if (!validFileExtensions.length) callback(null, true);
      else if (validFileExtensions.includes(getExtension(file.originalname)))
        callback(null, true);
      else
        callback(
          new ValidationError(
            `Invalid file format! Only ${validFileExtensions} formats are allowed!`
          )
        );
    },
  };
}

/**
 * Parsing and validating the form image data.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function parseMultiPartFormData(req, res, next) {
  const multerStorage = multer.memoryStorage();
  const multerOptions = getMulterOptions(
    multerStorage,
    MAX_IMAGE_SIZE,
    VALID_IMAGE_EXTENSIONS
  );

  const mutlerInstance = multer(multerOptions).single('image');

  mutlerInstance(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(new ValidationError('Error while uploading the image'));
    } else if (err) {
      return next(err);
    }

    if (!req.file) {
      return next(new ValidationError('Image not available'));
    }

    next();
  });
}

module.exports = {
  parseMultiPartFormData,
};
