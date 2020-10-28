const path = require("path");
const forge = require("node-forge");

function getUploadDir(subDirs) {
  return path.join(__dirname, "../../storage/app", subDirs);
}

function getRandomFilename(withExtension) {
  const filename = forge.util.bytesToHex(forge.random.getBytes(20));
  return filename + path.extname(withExtension);
}

function getFileUploadPath(fileExtension, subDirs) {
  const uploadDir = getUploadDir(subDirs);
  const filename = getRandomFilename(fileExtension);

  return {
    path: `${uploadDir}/${filename}`,
    name: filename,
  };
}

exports.getUploadDir = getUploadDir;
exports.getFileUploadPath = getFileUploadPath;
exports.getRandomFilename = getRandomFilename;
