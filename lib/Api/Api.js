const Drive = require("./Drive");
const Sheet = require("./Sheet");

class Api {
  constructor({ auth }) {
    this.sheet = new Sheet({
      sheetName: "Sheet1",
      spreadsheetId: process.env.GOOGLE_SPREAD_SHEET_ID,
      sheetId: process.env.GOOGLE_SHEET_ID,
      auth: auth
    });
    this.drive = new Drive({
      fileId: process.env.GOOGLE_FILE_ID,
      auth: auth
    });
  }
}

module.exports = Api;
