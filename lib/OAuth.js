/* eslint-disable new-cap */
/* eslint-disable camelcase */
"use strict";

const opn = require("open");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

var auth;

function OAuth(options) {
  const { envPath } = options;
  const file = path.join(__dirname, envPath);
  const json = fs.readFileSync(file);
  const keys = JSON.parse(json);

  auth = new google.auth.OAuth2(
    keys.web.client_id,
    keys.web.client_secret,
    keys.web.redirect_uris[0]
  );
}

OAuth.prototype.init = function(config, callback) {
  const { scopes, access_type = "offline" } = config;
  const app = express();

  const authUrl = auth.generateAuthUrl({
    access_type: access_type,
    scope: scopes
  });

  const server = app.listen(3000, () => {
    opn(authUrl, { wait: false });
  });

  app.get("/oauth2callback", async (req, res) => {
    const code = req.query.code;

    const token = await auth.getToken(code);

    auth.credentials = token;
    res.send("Success");

    callback();

    server.close();
  });
};

OAuth.prototype.moduleName = function() {
  return "OAuth";
};

module.exports = {
  OAuth
};
