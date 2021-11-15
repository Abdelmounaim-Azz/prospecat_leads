const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();
const _ = require("lodash");
module.exports = class Sheet {
  doc: any;
  constructor() {
    this.doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_URL);
  }
  async load() {
    await this.doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: _.replace(
        process.env.GOOGLE_PRIVATE_KEY,
        new RegExp("\\\\n", "g"),
        "\n"
      ),
    });

    await this.doc.loadInfo();
  }
  async addSheet(title: string, headerValues: string) {
    await this.doc.addSheet({ title, headerValues });
    //last sheet created
    return this.doc.sheetsByIndex.length - 1;
  }
  async addRow(row: any) {
    const sheet = this.doc.sheetsByIndex[0];
    await sheet.addRow(row);
  }
  async getRows() {
    const sheet = this.doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    return rows;
  }
};
