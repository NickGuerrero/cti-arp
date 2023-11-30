// TODO: NG WIP
// TS-Type Issue: https://stackoverflow.com/questions/52423842/what-is-not-assignable-to-parameter-of-type-never-error-in-typescript
// Clasp-TS Concern: https://stackoverflow.com/questions/48791868/use-typescript-with-google-apps-script
function processAttendanceTab() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var attendance_sheet = ss.getSheetByName("Attendance");
    var attendance_data = attendance_sheet.getDataRange().getValues();

    // Retrieve column indexes
    var date_col = attendance_data[0].indexOf('Date');
    var session_type_col = attendance_data[0].indexOf('Session Type');
    var link_type_col = attendance_data[0].indexOf('Link Type')
    var url_col = attendance_data[0].indexOf('Link: PearDeck Output');
    var processed_col = attendance_data[0].indexOf('Processed');
    var count_col = attendance_data[0].indexOf('Count');
    var output_log_col = attendance_data[0].indexOf('Output Log');
    var datesToProcess = [];
    var datesIndex = [];
    var output_messages = [];

    // Figures out the dates to process
    for (var i = 1; i < attendance_data.length; i++) {
      if ((attendance_data[i][processed_col] == '') && (datesToProcess.length == 0)) {
        datesToProcess.push(attendance_data[i]);
      }
      if(datesToProcess.length != 0) {
        if (isSameWeek(datesToProcess[0][0], attendance_data[i][date_col])) {
          datesToProcess.push(attendance_data[i]);
          datesIndex.push(i);
        }
      }   
    }

    // Reset Weekly Participation Session Score to zero
    changeColumnValues('Master Roster', 'Weekly Participation Session Score', 0)

    // Process each PearDeck Sheet
    //var mapping = map_roster_email(ss.getSheetByName("Master Roster").getDataRange().getValues());
    for(var i = 0; i < datesToProcess.length; i++) {
      var output_message = processAttendancePearDeck(datesToProcess[i][session_type_col], new Date(datesToProcess[i][date_col]), datesToProcess[i][url_col], datesToProcess[i][link_type_col])

      output_messages.push(output_message);
    }

    // Bug: setValue() is using the wrong row (off by 1)
    for (var i = 0; i < datesIndex.length; i++) {
      attendance_sheet.getRange(datesIndex[i] + 1, processed_col + 1).setValue('Yes');
      attendance_sheet.getRange(datesIndex[i] + 1, output_log_col+1 ).setValue(output_messages[i])
    }

    calculateLastWeekParticipationMetric()
}

// Compiled using becs-canvas-gradebook 1.0.0 (TypeScript 4.9.5)
var getWeek = function (date) {
  var janFirst = new Date(date.getFullYear(), 0, 1);
  // Source: https://stackoverflow.com/a/27125580/3307678
  return Math.ceil((((date.getTime() - janFirst.getTime()) / 86400000) + janFirst.getDay() + 1) / 7);
};
var isSameWeek = function (dateA, dateB) {
    var newDateA = new Date(dateA).setHours(0, 0, 0, 0);
    var newDateB = new Date(dateB).setHours(0, 0, 0, 0);
    console.log("newDateA: ", newDateA);
    console.log("newDateB: ", newDateB);
    console.log(getWeek(new Date(dateA)) === getWeek(new Date(dateB)));
    return getWeek(new Date(newDateA)) === getWeek(new Date(newDateB));
};

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

function calculateLastWeekParticipationMetric() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var roster_sheet = ss.getSheetByName('Master Roster');
  var roster_data = roster_sheet.getDataRange().getValues();
  var last_week_participation_metric_col = roster_data[0].indexOf('Last Week Participation Metric')
  var weekly_participation_session_score_col = roster_data[0].indexOf('Weekly Participation Session Score');
  var overall_participation_metric = 0;

  for(var i = 1; i < roster_data.length; i++) {
    var weekly_participation_session_score = roster_data[i][weekly_participation_session_score_col];
    var last_week_participation_metric = roster_data[i][last_week_participation_metric_col];

    Logger.log('Weekly partcipation = ' + weekly_participation_session_score + ' Last week partcipation Metric = ' + last_week_participation_metric);

    if(last_week_participation_metric == '') {
      last_week_participation_metric = 0;
      overall_participation_metric = weekly_participation_session_score * 1.0;
    }
    else {
       overall_participation_metric = (last_week_participation_metric * 0.6) + (weekly_participation_session_score * 0.4);
    }
    Logger.log('Calculated output = ' + overall_participation_metric);
    roster_sheet.getRange(i + 1, last_week_participation_metric_col + 1).setValue(overall_participation_metric);
  }  
}

function processAttendancePearDeck(type, session_date, pear_url, link_type) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var roster_sheet = ss.getSheetByName('Master Roster');
  var data = roster_sheet.getDataRange().getValues();
  var first_col = data[0].indexOf('First Name');
  var last_col = data[0].indexOf('Last Name');
  var email_col = data[0].indexOf('Email Address');
  var alt_col = data[0].indexOf('Alternate Email');
  var weekly_participation_session_score_col = data[0].indexOf('Weekly Participation Session Score');
  var pear = SpreadsheetApp.openByUrl(pear_url).getDataRange().getValues();
  var pear_found_flags = new Array(pear.length).fill(false);
  var max_submission = 0;
  var sessionMaxPoints = 0;
  var lastSessionAttendanceCol;
  var sessionHistoryCol;
  var sessionScoreCol;
  var pear_score = 0;
  var weekly_participation_session_score;
  var pear_name_col, pear_email_col;
  var pear_date = session_date.toDateString();
      pear_date = pear_date.replace(/,/g, "");

  //LINK TYPE
  if (link_type == 'Zoom') {
    max_submission = 120;
    pear_name_col = 0;
    pear_email_col = 1;
  } else {
    max_submission = findMaxSubmssion(pear);
    pear_name_col = 1;
    pear_email_col = 2;
  }

  if (type == 'Guided') {
      sessionMaxPoints = 40;
      lastSessionAttendanceCol = data[0].indexOf('Last Guided Session Attendance');
      sessionHistoryCol = data[0].indexOf('Guided Session History');
      sessionScoreCol = data[0].indexOf('Guided Session Score');
  }
  else if (type == 'Deep Work') {
      sessionMaxPoints = 30;
      lastSessionAttendanceCol = data[0].indexOf('Last Deep Work Session Attendance');
      sessionHistoryCol = data[0].indexOf('Deep Work Session History');
      sessionScoreCol = data[0].indexOf('Deep Work Session Score');
  }

  for (var i = 1; i < pear.length; i++) {
      var pear_name = pear[i][pear_name_col].toLocaleString().toLocaleLowerCase().replace(/\s/g, '');
      var pear_email = pear[i][pear_email_col].toLocaleString().toLocaleLowerCase().replace(/\s/g, '');
      Logger.log(pear_name + ' ' + pear_email);
      
      if (link_type == 'Zoom') {
        var pear_engagement = pear[i][2]; // Minutes in zoom
        var first_interaction = 'Y';
        if (pear_engagement < 100) {
          first_interaction = 'N';
        }

      } else {
        // Estimate PearDeck Engagement
        var pear_engagement = calculatePearEngagementInRow(pear[i]);
        var first_interaction = '';
        if (pear[i][3] == '') {
            first_interaction = 'N';
        }
        else {
            first_interaction = 'Y';
        }
      }
      for (var j = 1; j < data.length; j++) {
          var roster_name = data[j][first_col] + " " + data[j][last_col];
          roster_name = roster_name.toLocaleLowerCase().replace(/\s/g, '');
          var roster_email = data[j][email_col].toLocaleString().toLocaleLowerCase().replace(/\s/g, '');
          roster_email = roster_email.toLocaleString().toLocaleLowerCase().replace(/\s/g, '');
          var alt_email = data[j][alt_col].toLocaleString().toLocaleLowerCase().replace(/\s/g, '');

          if (((pear_email != "") && ((pear_email == roster_email) || (alt_email.includes(pear_email)))) || pear_name == roster_name) {
              var weekly_participation_session_score = data[j][weekly_participation_session_score_col];
              pear_score = (pear_engagement / max_submission) + 0.2;

              if (pear_score > 1) pear_score = 1;

              var new_weekly_participation_session_score = weekly_participation_session_score + (sessionMaxPoints * pear_score);

              roster_sheet.getRange(j + 1, weekly_participation_session_score_col + 1).setValue(new_weekly_participation_session_score);
              roster_sheet.getRange(j + 1, lastSessionAttendanceCol + 1).setValue(pear_date);
              roster_sheet.getRange(j + 1, sessionHistoryCol + 1).setValue(data[j][sessionHistoryCol] + '<' + pear_date + ': ' + type + ' - ' + first_interaction + ", " + pear_score.toFixed(2) + '>;\n');

              incrementRowColumn('Master Roster', j , 'Total number of sessions attended (Guided + DW)' , 1)

              if (data[j][first_col] == 'Mariano') {
                console.log('pear_engagement = ' + pear_engagement+ ' Pear_score = ' + pear_score + ' weekly_participation_session_score = ' + new_weekly_participation_session_score);
              }

              pear_found_flags[i] = true;
              if (!((pear_email == roster_email) || (alt_email.includes(pear_email)))) {
                  //Add the pear_email to the list of alt_email with a comma before
                  roster_sheet.getRange(j + 1, alt_col + 1).setValue(data[j][alt_col] + "," + pear_email);
              }
              Logger.log('Found.');
              break;
          }
      }
  }

  // Log the entries that are not found
  var output_message = '';
  for (var i = 1; i < pear_found_flags.length; i++) {
      if (pear_found_flags[i] == false) {
          var score = calculatePearEngagementInRow(pear[i]);
          output_message = output_message + 'Not in Roster: ' + pear[i][pear_name_col] + ' Email = ' + pear[i][pear_email_col] + ' Score = ' + (score / max_submission).toFixed(2) + ';\n';
      }
  }
  if (output_message == '')
      output_message = 'All Done';
  Logger.log(output_message);
  return output_message;
}

/** Given Pear Deck output row, calculate number of entries with non empty cell */
function calculatePearEngagementInRow(pear_row) {
  var pear_eng = 0;
  for (var p = 3; p < pear_row.length; p++) {
    if (pear_row[p] != "") {
      pear_eng = pear_eng + 1;
    }
  }
  return pear_eng;  
}

/** Find the max number of responses in a PearDeck Submission. */
function findMaxSubmssion (pear) {
  var max = 0;
  for (var i = 1; i < pear.length; i++) {
    var current_count = 0;
    for (var j = 3; j < pear[0].length; j++) {
      if (pear[i][j] != '') {
        current_count++;
      }
    }
    if (current_count > max) max = current_count;
  }
  return max;
}

function incrementRowColumn(worksheet, row, column_title, amount) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var active_worksheet = ss.getSheetByName(worksheet);
  var worksheet_data = active_worksheet.getDataRange().getValues();
  var column_index = worksheet_data[0].indexOf(column_title);
  var column_data = worksheet_data[row][column_index];

  if(column_data == '') {
    column_data = 0;

  }
  
  column_data = column_data + amount;
  active_worksheet.getRange(row + 1, column_index + 1).setValue(column_data)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////// WIP
// Idea: Save the output on the sheet and re-calculate when hash of FirstName OR Email column no longer matches
function map_roster_email(master_data){
  /**
   * Associate emails with a row, N:1 mapping (1st Row starts at 1, not 0)
   * @param master_data <Sheet.values()>: 2-dim array of all data contained on sheet (only email & alt-email cols used)
   * @return Map/Dictionary with emails (keys) to row positions (values)
   */
  var email_col = master_data[0].indexOf('Email Address');
  var alt_col = master_data[0].indexOf('Alternate Email');
  var email_mapping = new Map(); var alt_parse;
  for (let i = 1; i < master_data.length; i++){
    // Create master roster mapping for faster reference
    // Locale functions were part of original code, still here for compatibility reasons
    email_mapping.set(master_data[i][email_col].toLocaleString().toLocaleLowerCase().replace(/\s/g, ''), i);
    alt_parse = master_data[i][alt_col].split(",").filter((x) => x); // Filter out empty strings
    alt_parse.forEach((em) => email_mapping.set(em.toLocaleString().toLocaleLowerCase().replace(/\s/g, ''), i));
  }
  return email_mapping;
}

// Test map_roster_email
function testmapping(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Master Roster");
  var sheet_data = sheet.getDataRange().getValues();
  var test = map_roster_email(sheet_data);
  const iterator1 = test.entries()
  for(let i = 0; i  < 10; i++){
    console.log(iterator1.next().value);
  }
  console.log(test.size);
}