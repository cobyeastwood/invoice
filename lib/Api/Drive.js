const os = require("os");
const fs = require("fs");
const path = require("path");

const { google } = require("googleapis");

const drive = google.drive("v3");

const MimeTypeEnum = {
  PDF: "application/pdf",
  TXT: "text/plain"
};

class Drive {
  constructor({ fileId, auth }) {
    this.fileId = fileId;
    this.auth = auth;
  }

  getMimeType(fileName) {
    let mimeType = MimeTypeEnum.PDF;

    if (fileName.indexOf(".") !== -1) {
      switch (fileName.split(".").pop()) {
        case "txt":
          mimeType = MimeTypeEnum.TXT;
          break;
        case "pdf":
          mimeType = MimeTypeEnum.PDF;
          break;
        default:
          break;
      }
    }

    return mimeType;
  }

  async list(pageSize, fields) {
    try {
      const files = await drive.files.list({
        auth: await this.auth.init(),
        pageSize: pageSize,
        fields: fields
      });

      return { files: files.data.files };
    } catch (e) {
      console.log(e);
    }
  }

  async get() {
    try {
      await drive.files.get({
        auth: await this.auth.init()
      });
    } catch (e) {
      console.log(e);
    }
  }

  async export(fileName) {
    try {
      const destPath = path.join(os.tmpdir(), fileName);
      const dest = fs.createWriteStream(destPath);

      const files = await drive.files.export(
        {
          auth: await this.auth.init(),
          fileId: this.fileId,
          mimeType: this.getMimeType(fileName)
        },
        { responseType: "stream" }
      );

      return new Promise(resolve => {
        try {
          files.data
            .on("error", e => {
              throw e;
            })
            .pipe(dest)
            .on("error", e => {
              throw e;
            })
            .on("finish", () => {
              return resolve(destPath);
            });
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Drive;
