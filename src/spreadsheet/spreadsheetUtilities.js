function changeColumnValues(worksheet, column_title, new_data) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var active_worksheet = ss.getSheetByName(worksheet);
    var worksheet_data = active_worksheet.getDataRange().getValues();
    var column_index = worksheet_data[0].indexOf(column_title);

    for(var i = 1; i < worksheet_data.length; i++) {
      var column_data = worksheet_data[i][column_index];
      column_data = new_data;
      active_worksheet.getRange(i + 1, column_index + 1).setValue(column_data)
    }
        
}

function findColInGradeBook(grades_titles, title) {
    for (var i = 0; i < grades_titles.length; i++) {
      let canvas_gradebook_title = grades_titles[i].toLocaleString().replace(/\s+/g, '');  // remove all white spaces
      let milestone_title = title.toLocaleString().replace(/\s+/g, '');  // remove all white spaces
  
      if (canvas_gradebook_title.includes(milestone_title)) {
        return i
      }
    }
    return -1;
}