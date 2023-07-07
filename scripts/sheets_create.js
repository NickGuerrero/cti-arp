/**
 * Create a google spreadsheet
 * @param {string} title Spreadsheets title
 * @return {string} Created spreadsheets ID
 */
async function create(title) {
    const {GoogleAuth} = require('google-auth-library');
    const {google} = require('googleapis');
  
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
  
    const service = google.sheets({version: 'v4', auth});
    const resource = {
      properties: {
        title,
      },
    };
    try {
      const spreadsheet = await service.spreadsheets.create({
        resource,
        fields: 'spreadsheetId',
      });
      console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
      return spreadsheet.data.spreadsheetId;
    } catch (err) {
      // TODO (developer) - Handle exception
      throw err;
    }
  }