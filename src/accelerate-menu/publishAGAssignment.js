// NG: Updated to improve performance, tested but please make sure that the script is working
// Copy columns related to AG assignment over to a publishable Google Sheet
// Note: This does NOT filter out rows that have no AG assigned. This was allowed, as it can help determine if a student is on the roster or not.
// Note: This does NOT sort the list, order from the master roster is preserved
function publishAGAssignment () {
    var master = SpreadsheetApp.getActiveSpreadsheet();
    var dashboard = master.getSheetByName('Master Roster');
    var data = dashboard.getDataRange().getValues();
    var columns = [
      data[0].indexOf('First Name'),
      data[0].indexOf('First Name') + 1, // "Preferred Name", written like this in original code
      data[0].indexOf('Last Name'),
      data[0].indexOf('Accountability Group'),
      data[0].indexOf('Accountability Team'),
      data[0].indexOf('SA Name')
    ];
  
    // Prepare AG Assignment sheet to be written over
    var out_sheet = master.getSheetByName('AG Assignment');
    out_sheet.clearContents();
    out_sheet.appendRow(['First Name','Preferred Name','Last Name','AG Group', 'AG Team #','Assigned SA'])
  
    // Copy all standard columns over
    var num_rows = dashboard.getLastRow() - 1;
    var cur_col = 1;
    columns.forEach((col_id) =>
      dashboard.getRange(2, col_id + 1, num_rows, 1).copyValuesToRange(out_sheet, cur_col, cur_col++, 2, dashboard.getLastRow())
    );
    // Note: This does NOT filter out rows that have no AG assigned. This was allowed, as it can help determine if a student is on the roster or not.
  
    /** Original script, replace if above script is not working
    var master = SpreadsheetApp.getActiveSpreadsheet();
    var dashboard = master.getSheetByName('Master Roster');
    var data = dashboard.getDataRange().getValues();
      var sa_col = data[0].indexOf('SA Name');
    var first_col = data[0].indexOf('First Name');
    var last_col = data[0].indexOf('Last Name');
    var ag_col = data[0].indexOf('Accountability Group');
    var ag_team_col = data[0].indexOf('Accountability Team');
    var out_sheet = master.getSheetByName('AG Assignment');
    out_sheet.clearContents();
    out_sheet.appendRow(['First Name','Preferred Name','Last Name','AG Group', 'AG Team #','Assigned SA'])
    for (var i = 1; i < data.length; i++) {
      if (data[i][ag_col] == '') break;
      out_sheet.appendRow([data[i][first_col], data[i][first_col+1], data[i][last_col], data[i][ag_col], data[i][ag_team_col], data[i][sa_col]]);
    } */
}