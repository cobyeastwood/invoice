const { google } = require("googleapis");

const sheets = google.sheets("v4");

class SheetApi {
  constructor({ sheetName, spreadsheetId, auth }) {
    this.sheetName = sheetName;
    this.spreadsheetId = spreadsheetId;
    this.auth = auth;
  }

  getRange(range) {
    return `${this.sheetName}!${range}`;
  }

  async get(range) {
    try {
      const sheet = await sheets.spreadsheets.values.get({
        auth: await this.auth.init(),
        spreadsheetId: this.spreadsheetId,
        range: this.getRange(range)
      });

      const rows = sheet.data.values;

      const data = [];

      if (rows.length) {
        for (const row of rows) {
          data.push(row);
        }
      }

      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = {
  SheetApi
};
