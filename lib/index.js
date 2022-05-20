/* eslint-disable new-cap */

// Google Documents

// Sheets
// https://developers.google.com/sheets/api/reference/rest
// https://github.com/googleapis/google-api-nodejs-client#oauth2-client

// Drive
// https://developers.google.com/drive/api/v3/reference/files/export

// Stackoverflow Documents
// stackoverflow.com/questions/38949318/google-sheets-api-returns-the-caller-does-not-have-permission-when-using-serve

const { Basic } = require("./Basic");
const { SheetApi } = require("./SheetApi");

require("dotenv").config();

const options = {
  envPath: "../halogen-pier-344523-712c18ab04ec.json",
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.readonly"
  ]
};

const sheetApi = new SheetApi({
  sheetName: "Sheet1",
  spreadsheetId: process.env.GOOGLE_SPREAD_SHEET_ID,
  sheetId: process.env.GOOGLE_SHEET_ID,
  auth: new Basic(options)
});
