function getExtension(fileName) {
  const extension = fileName.split('.').pop();

  return extension === fileName ? '' : extension;
}

function getFileName(fileName) {
  const extStartIndex = fileName.lastIndexOf('.');

  return fileName.substr(0, extStartIndex);
}

/**
 * Adds timestamp to the original file name.
 *
 * @example
 * addTimestampToFilename('file.ext')
 * => 'file-123456789.ext'
 *
 * @param {String} fileName
 */
function addTimestampToFilename(fileName) {
  const timeStamp = new Date().getTime();
  const file = getFileName(fileName);
  const ext = getExtension(fileName);

  return `${file}-${timeStamp}.${ext}`;
}

module.exports = {
  getExtension,
  getFileName,
  addTimestampToFilename,
};
