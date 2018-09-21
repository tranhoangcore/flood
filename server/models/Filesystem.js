const fs = require('fs');
const ospath = require('ospath');
const path = require('path');

class Filesystem {
  getDirectoryList(options, callback) {
    const sourcePath = (options.path || '/').replace(/^~/, ospath.home());

    try {
      const directories = [];
      const files = [];

      fs.readdirSync(sourcePath).forEach((item) => {
        if (fs.statSync(path.join(sourcePath, item)).isDirectory()) {
          directories.push(item);
        } else {
          files.push(item);
        }
      });

      const hasParent = /^.{0,}:?(\/|\\){1,1}\S{1,}/.test(sourcePath);

      callback({
        directories,
        files,
        hasParent,
        path: sourcePath,
        separator: path.sep,
      });
    } catch (error) {
      callback(null, error);
    }
  }
}

module.exports = new Filesystem();
