/**
 * Function: processWithdrawalForm
 * Take input from https://docs.google.com/spreadsheets/d/1VW1_dRpOSezypDuk5zNR0MiYrqQ0mlm0S5AGnn8lr1Y/edit?usp=sharing and move those entries into withdrawn tab
 */
function processWithdrawalForm() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 1');
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
    var first_col = data[0].indexOf("First Name");
    var last_col = data[0].indexOf("Last Name");
    var email_col = data[0].indexOf("Email Address");
    var alt_col = data[0].indexOf("Alternate Email");
  
  
    var withdrawn_records = ss.getSheetByName('Withdrew from the program');
  
    var withdrawal_sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1VW1_dRpOSezypDuk5zNR0MiYrqQ0mlm0S5AGnn8lr1Y/edit?usp=sharing').getSheetByName('Form Responses 1');
    var withdrawal_data = withdrawal_sheet.getDataRange().getValues();
    var processed_col = withdrawal_data[0].indexOf('Processed');
    var f_col = withdrawal_data[0].indexOf("First Name:");
    var l_col = withdrawal_data[0].indexOf("Last Name:");
    var e_col = withdrawal_data[0].indexOf("Email Address");  
    var found = false;
  
    for (var i = 1; i < withdrawal_data.length; i++) {
  
      if ((withdrawal_data[i][processed_col] == '') ||(withdrawal_data[i][processed_col] == 'NOT FOUND')) {
        Logger.log('Looking for ... ' + withdrawal_data[i][f_col]);
        found = false;
        for (var j = 1; j < data.length; j++) {
          if ((withdrawal_data[i][e_col] == data[j][email_col]) || ((withdrawal_data[i][f_col] == data[j][first_col]) && (withdrawal_data[i][l_col] == data[j][last_col]))) {
            Logger.log ('Found in row ' + j);
            withdrawn_records.appendRow(data[j]);
            list.deleteRow(j+1);
            withdrawal_sheet.getRange(i+1, processed_col+1).setValue('Yes');
            found = true;
            var data = list
              .getRange(1, 1, list.getLastRow(), list.getLastColumn())
              .getValues();
            break;
          }
        }
        if (found == false) {
          withdrawal_sheet.getRange(i+1, processed_col+1).setValue('NOT FOUND');
        }
  
      }
    }
  }