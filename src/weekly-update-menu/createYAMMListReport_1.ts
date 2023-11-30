// Compiled using becs-canvas-gradebook 1.0.0 (TypeScript 4.9.5)
// Note: Nicolas G. modified this script, remove NG lines/sections to restore to original version
function createYammListReport() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Master Roster');
    var today = new Date();
    var output = ss.insertSheet(today.toDateString() + "-" + "YAMM");
    output.appendRow(['First Name', 'Email Address', 'Course', 'Milestone', 'Number of Inactive Weeks',
    'Chosen Pathway', 'Recommended Course', 'Recommended Milestone', 'Pathway Status', 'Progress Status',
    'Participation Status', 'Pathway Status History', 'PSH Tail', 'Last Week Pathway Status']);
  
    // Whole roster: var data = list.getRange(1, 1, list.getLastRow(), list.getLastColumn()).getValues();
    var data = list.getRange("1:1").getValues(); // Get title columns to determine where columns are
    var columns = [
      data[0].indexOf("First Name") + 1,
      data[0].indexOf("Email Address") + 1,
      data[0].indexOf('Course') + 1,
      data[0].indexOf('Milestone') + 1,
      data[0].indexOf('# of Inactive Weeks') + 1,
      data[0].indexOf('Chosen Pathway') + 1,
      data[0].indexOf('Recommended Course') + 1,
      data[0].indexOf('Recommended Milestone') + 1,
      data[0].indexOf('Pathway Status') + 1,
      data[0].indexOf('Progress Color Code') + 1,
      data[0].indexOf('Participation Color Code') + 1,
      data[0].indexOf('Pathway Status History') + 1
    ];
  
    // Copy all standard columns over
    var num_rows = list.getLastRow() - 1;
    var cur_col = 1;
    columns.forEach((col_id) =>
      list.getRange(2, col_id, num_rows, 1).copyValuesToRange(output, cur_col, cur_col++, 2, list.getLastRow())
    );
  
    // Handle Last Week Pathway Status separately
    output.getRange(2, cur_col++, output.getLastRow()).setFormulaR1C1('=REGEXEXTRACT(R[0]C[-1], "-?\\d+>,\\n?<.*>,\\n?$")');
    output.getRange(2, cur_col++, output.getLastRow()).setFormulaR1C1('=REGEXEXTRACT(R[0]C[-1], "-?\\d+")');
    output.hideColumns(cur_col - 3, 2); // Hide Pathway Status History & PSH Tail
  }