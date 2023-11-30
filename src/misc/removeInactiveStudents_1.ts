function removeInactiveStudents() {
    var column_data = getColumn('Master Roster', '# of Inactive Weeks')
    var inactive_weeks = 12;
    var student_data;
  
  
    for(var i = column_data.length-1; i > 0; i--) {
      if(column_data[i] >= inactive_weeks) {
        
        student_data = getRow('Master Roster', i)
        setRow('Inactive Students', student_data)
        deleteRow('Master Roster', i)
  
        console.log(student_data)
      }
    }
}

function getColumn(worksheet_name, column_name) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var worksheet = ss.getSheetByName(worksheet_name);
    var worksheet_data = worksheet.getDataRange().getValues();
  
    var column_index = worksheet_data[0].indexOf(column_name);
    var column_data = [];
  
  
    for(var i = 0; i < worksheet_data.length; i++) {
      column_data.push(worksheet_data[i][column_index])
    }
  
    return column_data;
}

function getRow(worksheet_name, row_index) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var worksheet = ss.getSheetByName(worksheet_name);
    var worksheet_data = worksheet.getDataRange().getValues();
  
    return worksheet_data[row_index]
}

function setRow(worksheet_name, row_data) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var worksheet = ss.getSheetByName(worksheet_name);
    var worksheet_data = worksheet.getDataRange().getValues();
  
    worksheet_data.push(row_data)
  
    updateSpreadSheetView(worksheet_name, worksheet_data)
}

function deleteRow(worksheet_name, row_index) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var worksheet = ss.getSheetByName(worksheet_name);
    var worksheet_data = worksheet.getDataRange().getValues();
  
    worksheet_data.splice(row_index, 1)
  
    updateSpreadSheetView(worksheet_name, worksheet_data)
}