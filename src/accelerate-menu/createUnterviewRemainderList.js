/***
 * Function to create list of students to send an email remainder for their Unterview Session
 * Students with Unterview invite and not having attended Unterview and not cohort students
 */
function createUnterviewRemainderList() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 1');
    var remainder_list = ss.getSheetByName('Unterview Reminder');
  
    remainder_list.appendRow([new Date()]);
  
    var data = list.getDataRange().getValues();
    var first_col = data[0].indexOf("First Name");
    var email_col = data[0].indexOf("Email Address");  
    
    var cal_unterview_col = data[0].indexOf('Calendar Invite for Unterview');
    var unterview_attended_col = data[0].indexOf('Unterview Attended');
    var cohort_col = data[0].indexOf('Cohort Students');
  
  
    for (var i = 1; i < data.length; i++) {
      var first = data[i][first_col];
      var email = data[i][email_col];
      var submit_time = data[i][0];
      if(data[i][first_col+1] != "") first = data[i][first_col+1];
  
      if ((list.getRange(i+1, cohort_col+1).isChecked() != true) && (list.getRange(i+1, cal_unterview_col+1).isChecked() == true) && (list.getRange(i+1, unterview_attended_col+1).isChecked() != true)) remainder_list.appendRow([submit_time,first,email]);
    }
}