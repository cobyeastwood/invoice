/* eslint-disable new-cap */

// https://github.com/googleapis/google-api-nodejs-client#oauth2-client
// Documents stackoverflow.com/questions/38949318/google-sheets-api-returns-the-caller-does-not-have-permission-when-using-serve

const { Basic } = require("./Basic");
const { SheetApi } = require("./SheetApi");

require("dotenv").config();

const options = {
  envPath: "../halogen-pier-344523-712c18ab04ec.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
};

const sheetApi = new SheetApi({
  sheetName: "Sheet1",
  spreadsheetId: process.env.GOOGLE_SPREAD_SHEET_ID,
  sheetId: process.env.GOOGLE_SHEET_ID,
  auth: new Basic(options)
});
