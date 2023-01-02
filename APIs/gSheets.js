// Reference: https://www.youtube.com/watch?v=PFJNJQCU_lo

// Use credentials
const creds = require("../Credentials/sheetsCreds.json");

// Import Google Sheets API
const {
    GoogleSpreadsheet
} = require('google-spreadsheet');

// Get sheet by title
async function sheetByTitle(title, sheetID) {
    const doc = new GoogleSpreadsheet(sheetID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    console.log(`Getting Sheet [${title}]... Success!`);
    const sheet = doc.sheetsByTitle[title];
    return sheet.getRows()
}
/**
 * INPUTS
 * title   - title of sheet (page) in sheets document
 * sheetID - the random looking string in URL of sheets document
 * OUTPUTS
 * Matrix of sheet [row index]["column title"]
 */

function urlToSheetID(url){
    return url[0].split("docs.google.com/spreadsheets/d/")[1].split("/")[0]
}

module.exports = {
    sheetByTitle,
    urlToSheetID
};