const { google } = require("googleapis");

var auth;

function Basic(options) {
  const { envPath, scopes } = options;
  auth = new google.auth.GoogleAuth({
    keyFilename: envPath,
    scopes
  });
}

Basic.prototype.init = function() {
  return auth.getClient();
};

Basic.prototype.moduleName = function() {
  return "Basic";
};

module.exports = Basic;
