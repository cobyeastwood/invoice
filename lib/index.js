/* eslint-disable new-cap */

// Google Documents

// Sheets
// https://developers.google.com/sheets/api/reference/rest
// https://github.com/googleapis/google-api-nodejs-client#oauth2-client

// Drive
// https://developers.google.com/drive/api/v3/reference/files/export

// Stackoverflow Documents
// stackoverflow.com/questions/38949318/google-sheets-api-returns-the-caller-does-not-have-permission-when-using-serve

const { Api } = require("./Api");
const { Basic } = require("./Auth");

const path = require("path");
const open = require("open");

require("dotenv").config();

const options = {
  envPath: path.join(__dirname, "../halogen-pier-344523-712c18ab04ec.json"),
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
  ]
};

const api = new Api({ auth: new Basic(options) });

api.drive.export("test.pdf").then(path => {
  open(path);
});
