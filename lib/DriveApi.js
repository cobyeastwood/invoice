const os = require("os");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const drive = google.drive("v3");

class DriveApi {
  constructor(fileId) {
    this.fileId = fileId;
  }

  async export(fileName, mimeType) {
    const destPath = path.join(os.tmpdir(), fileName);

    const dest = fs.createWriteStream(destPath);

    const file = await drive.files.export(
      {
        fileId: this.fileId,
        mimeType: mimeType
      },
      { responseType: "stream" }
    );

    return new Promise((resolve, reject) => {
      try {
        file.data
          .on("error", reject)
          .pipe(dest)
          .on("error", reject)
          .on("finish", resolve);
      } catch (e) {
        console.log(e);
      }
    });
  }
}

module.exports = {
  DriveApi
};
