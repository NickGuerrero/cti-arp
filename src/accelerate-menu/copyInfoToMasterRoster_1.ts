/***
 * Function to copy data from Form Responses into Master Roster
 */

function copyInfoToMasterRoster() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 8');  
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();  
    var data_canvas_col = data[0].indexOf('Canvas ID');
    var data_quiz_col = data[0].indexOf('Commitment Quiz Score');
  
  
    var master = ss.getSheetByName('Master Roster');
    var master_data = master.getDataRange().getValues();
    var master_canvas_col = master_data[0].indexOf('Canvas ID');
    var master_new_row = master_data.length + 1;
  
  
    for (var i = 1; i < data.length; i++) {
      if (data[i][data_quiz_col] == '') continue;
      var already_exisits = false;
      for (var j = 1; j < master_data.length; j++) {
        if (data[i][data_canvas_col] == master_data[j][master_canvas_col]) {
          already_exisits = true;
          break;
        }
      }
  
      if (already_exisits == true) continue;
  
      Logger.log('Copyging ' + data[i][2]);
  
      for (var master_col = 0; master_col < master_data[0].length; master_col ++) {
        var data_col = data[0].indexOf(master_data[0][master_col]);
        if (data_col != -1) {
          master.getRange(master_new_row, master_col + 1).setValue(data[i][data_col]);
        }
      }
  
      master_new_row++;
    }
}