const { google } = require("googleapis");

const sheets = google.sheets("v4");

class SheetApi {
  constructor({ sheetName, spreadsheetId, sheetId, auth }) {
    this.sheetName = sheetName;
    this.spreadsheetId = spreadsheetId;
    this.sheetId = sheetId;
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

      return { rows: sheet.data.values };
    } catch (e) {
      console.log(e);
    }
  }

  async append(range, ...values) {
    try {
      const sheet = await sheets.spreadsheets.values.append({
        auth: await this.auth.init(),
        spreadsheetId: this.spreadsheetId,
        valueInputOption: "USER_ENTERED",
        range: this.getRange(range),
        requestBody: {
          values
        }
      });
      return { data: sheet.data };
    } catch (e) {
      console.log(e);
    }
  }

  async batchUpdate(startIndex, endIndex, dimension = "COLUMNS") {
    try {
      const sheet = await sheets.spreadsheets.batchUpdate({
        auth: await this.auth.init(),
        spreadsheetId: this.spreadsheetId,
        resource: {
          requests: [
            {
              insertDimension: {
                range: {
                  sheetId: this.sheetId,
                  dimension: dimension,
                  startIndex,
                  endIndex
                },
                inheritFromBefore: false
              }
            }
          ]
        }
      });
      return { data: sheet.data };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = {
  SheetApi
};
