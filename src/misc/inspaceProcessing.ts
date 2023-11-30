function calculateInspaceEngagement(inspace_row) {
    var join_hour = parseInt(inspace_row[2].toLocaleString().slice(11,13));
    var join_min = parseInt(inspace_row[2].toLocaleString().slice(14));
    
    var leave_hour = parseInt(inspace_row[3].toLocaleString().slice(11,13));
    var leave_min = parseInt(inspace_row[3].toLocaleString().slice(14));

    var score = (leave_hour - join_hour) * 60 + (leave_min - join_min);

    return score;
}

/**
 * Function will process pearDeck output from Attendance tab for synchronous sessions
 */
function processAttendanceInspace(type, session_date, pear_url) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var roster_sheet = ss.getSheetByName('Form Responses 1');

  var data = roster_sheet.getDataRange().getValues();

  var pear = SpreadsheetApp.openByUrl(pear_url).getDataRange().getValues();
  var pear_found_flags = new Array(pear.length).fill(false);
  
  var first_col = data[0].indexOf('First Name');
  var last_col = data[0].indexOf('Last Name');
  var email_col = data[0].indexOf('Email Address');    
  var alt_col = data[0].indexOf('Alternate Email');

  var last_attendance_col = data[0].indexOf('Last Deep Work Session Attendance');
  var score_col = data[0].indexOf('Deep Work Session Score');
  var history_col = data[0].indexOf('Deep Work Session History');

  for (var i = 0; i < pear.length; i++) {
    var pear_name = pear[i][0].toLocaleString().toLocaleLowerCase();
    var pear_email = pear[i][1].toLocaleString().toLocaleLowerCase();

    Logger.log(pear_name + ' ' + pear_email);
    // Estimate Inspace Engagement
    var inspace_score = parseInt(calculateInspaceEngagement(pear[i]));

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
        current_score = current_score+(inspace_score);
        roster_sheet.getRange(j+1,score_col+1).setValue(current_score);
        roster_sheet.getRange(j+1,history_col+1).setValue(data[j][history_col] + '<' +session_date.toDateString()+ ': ' +type.slice(8) + ' - ' + inspace_score+'>;\n');
        pear_found_flags[i] = true;
        Logger.log('Found. ' + current_score)
        break;
      } else if (pear_name == roster_name) {
        roster_sheet.getRange(j+1,last_attendance_col+1).setValue(session_date);
        var current_score = data[j][score_col];
        if (current_score == '') current_score = 0;
        current_score = current_score+(inspace_score);
        roster_sheet.getRange(j+1,score_col+1).setValue(current_score);
        roster_sheet.getRange(j+1,history_col+1).setValue(data[j][history_col] + '<' +session_date.toDateString()+ ': '  +type.slice(8) + ' - ' + inspace_score+'>;\n');
    
        pear_found_flags[i] = true;
        Logger.log('Alt Found ' + current_score);

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
      var score = calculateInspaceEngagement(pear[i]);
      output_message = output_message + 'Not in Roster: ' + pear[i][1] +  ' Email = ' + pear[i][2] + ' Score = ' + score + ';\n';
    }
  }

  if (output_message == '') output_message = 'All Done';

  Logger.log(output_message);

  return output_message;
}