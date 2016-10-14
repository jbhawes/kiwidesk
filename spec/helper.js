var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'KiwiDesk-darwin-x64', 'KiwiDesk.app', 'Contents', 'MacOS', 'KiwiDesk');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'KiwiDesk-linux-x64', 'KiwiDesk');
      default:
        throw 'Unsupported platform';
    }
  }
};
