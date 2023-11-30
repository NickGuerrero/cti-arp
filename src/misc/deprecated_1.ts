// Note: These functions are no longer used, but kept here until the repo is parallel to live version

/**
 * Function will process pearDeck output from Attendance tab for synchronous sessions
 */
function processAttendancePearDeckOld(type, session_date, pear_url) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var roster_sheet = ss.getSheetByName('Form Responses 1');
  
    var data = roster_sheet.getDataRange().getValues();
  
    var pear = SpreadsheetApp.openByUrl(pear_url).getDataRange().getValues();
    var pear_found_flags = new Array(pear.length).fill(false);
    
  
    var max_submission = findMaxSubmssion(pear);
  
    var first_col = data[0].indexOf('First Name');
    var last_col = data[0].indexOf('Last Name');
    var email_col = data[0].indexOf('Email Address');    
    var alt_col = data[0].indexOf('Alternate Email');
  
    var last_attendance_col = data[0].indexOf('Last Synch Session Attendance');
    var score_col = data[0].indexOf('Synch Session Score');
    var history_col = data[0].indexOf('Synch Session History');
    var pear_score = 0;
  
    for (var i = 0; i < pear.length; i++) {
      var pear_name = pear[i][1].toLocaleString().toLocaleLowerCase();
      var pear_email = pear[i][2].toLocaleString().toLocaleLowerCase();
  
      Logger.log(pear_name + ' ' + pear_email);
      // Estimate PearDeck Engagement
      var pear_engagement = calculatePearEngagementInRow(pear[i]);
      var first_interaction = '';
      if (pear[i][3] == '') {
        first_interaction = 'N';
      } else {
        first_interaction = 'Y';
      }
      for (var j = 1; j < data.length; j++) {
        var roster_name = data[j][first_col] + " " + data[j][last_col];
        roster_name = roster_name.toLocaleLowerCase();
        var roster_email = data[j][email_col];
        roster_email = roster_email.toLocaleString().toLocaleLowerCase();
        var alt_email = data[j][alt_col];
  
        if ((pear_email == roster_email) || (alt_email.includes(pear_email))) {
          roster_sheet.getRange(j+1,last_attendance_col+1).setValue(session_date);
          var current_score = data[j][score_col];
          if (current_score == '') current_score = 0;
          pear_score = (pear_engagement/max_submission);
          current_score = current_score+parseFloat(pear_score);
          roster_sheet.getRange(j+1,score_col+1).setValue(current_score).setNumberFormat('0.00');
          roster_sheet.getRange(j+1,history_col+1).setValue(data[j][history_col] + '<' +session_date.toDateString()+ ':' +type.slice(9) + ' - ' + first_interaction + ", " + pear_score.toFixed(2)+'>;\n');
          pear_found_flags[i] = true;
          Logger.log('Found.')
          break;
        } else if (pear_name == roster_name) {
          roster_sheet.getRange(j+1,last_attendance_col+1).setValue(session_date);
          var current_score = data[j][score_col];
          pear_score = (pear_engagement/max_submission);
          if (current_score == '') current_score = 0;
          current_score = current_score+parseFloat(pear_score);
          roster_sheet.getRange(j+1,score_col+1).setValue(current_score).setNumberFormat('0.00');
          roster_sheet.getRange(j+1,history_col+1).setValue(data[j][history_col] + '<' +session_date.toDateString()+ ':' +type.slice(9) + ' - ' + first_interaction + ", " + pear_score.toFixed(2)+'>;\n');
      
          pear_found_flags[i] = true;
          Logger.log('Alt Found');
  
          if (alt_email == '') {
            roster_sheet.getRange(j+1,alt_col+1).setValue(pear_email);
          } else {
            roster_sheet.getRange(j+1,alt_col+1).setValue(pear_email + ", " + alt_email);
          }
          break;      
        }
      }
    }
  
  
    // Log the entries that are not found
  
    var output_message = '';
  
    for (var i = 1; i < pear_found_flags.length; i++) {
      if (pear_found_flags[i] == false) {
        var score = calculatePearEngagementInRow(pear[i]);
        output_message = output_message + 'Not in Roster: ' + pear[i][1] +  ' Email = ' + pear[i][2] + ' Score = ' + (score/max_submission).toFixed(2) + ';\n';
      }
    }
  
    if (output_message == '') output_message = 'All Done';
  
    Logger.log(output_message);
  
    return output_message;
}  
  
  
function processAttendanceTabOld() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var attendance_sheet = ss.getSheetByName('Attendance');
    var attendance_data = attendance_sheet.getDataRange().getValues();
  
    var date_col = attendance_data[0].indexOf('Date');
    var type_col = attendance_data[0].indexOf('Session Type');
    var url_col = attendance_data[0].indexOf('Link: PearDeck for Synch (or) InSpace for Deep');
    var processed_col = attendance_data[0].indexOf('Processed');
    var out_col = attendance_data[0].indexOf('Output Log');
  
    for (var i = 1; i< attendance_data.length; i++) {
      if ((attendance_data[i][processed_col] == '') && (attendance_data[i][url_col] != '')) {
        Logger.log('Checking ... ' + attendance_data[i][type_col]);
        if (attendance_data[i][type_col].toLocaleString().includes('PearDeck')) {
          Logger.log('Process Synch')
          var output_message = processAttendancePearDeck(attendance_data[i][type_col], new Date(attendance_data[i][date_col]), attendance_data[i][url_col]);
          attendance_sheet.getRange(i+1, processed_col+1).setValue('Yes');
          attendance_sheet.getRange(i+1, out_col+1).setValue(output_message);
        } else if (attendance_data[i][type_col].toLocaleString().includes('InSpace')) {
          Logger.log('Process Deep Work')
          var output_message = processAttendanceInspace(attendance_data[i][type_col], new Date(attendance_data[i][date_col]), attendance_data[i][url_col]);
          attendance_sheet.getRange(i+1, processed_col+1).setValue('Yes');
          attendance_sheet.getRange(i+1, out_col+1).setValue(output_message);
        } else {
          attendance_sheet.getRange(i+1, out_col+1).setValue('DO NOT RECOGNIZE TYPE');
    
        }
  
      }
    }
}