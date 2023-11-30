/**
 * Function will create a list of students who haven't attended an unterview session as of date
 * Run this function after processing Unterview PearDeck
 */
function createNextUnterviewSessionInviteList() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 1');
    var next_invite = ss.getSheetByName('Next Session Invites');
  
    next_invite.clearContents();
    next_invite.appendRow(['First Name', 'Email']);
    var data = list.getDataRange().getValues();
    var first_col = data[0].indexOf("First Name");
    var last_col = data[0].indexOf("Last Name");
    var email_col = data[0].indexOf("Email Address");  
    
    var calendar_unterview_col = data[0].indexOf('Calendar Invite for Unterview');
    var unterview_attended_col = data[0].indexOf('Unterview Attended');
  
  
    for (var i = 1; i < data.length; i++) {
      var first = data[i][first_col];
      var email = data[i][email_col];
      if(data[i][first_col+1] != "") first = data[i][first_col+1];
  
      if ((list.getRange(i+1, calendar_unterview_col+1).isChecked() == true) && (list.getRange(i+1, unterview_attended_col+1).isChecked() != true)) next_invite.appendRow([first,email]);
    }
  
  
  /*** Don't NEED THIS ANYMORE
    var data_old = list_old.getDataRange().getValues();
  
    for (var i = 1; i < data_old.length; i++) {
      var first = data_old[i][first_col];
      var email = data_old[i][email_col]
  
      if(data_old[i][first_col+1] != "") first = data_old[i][first_col+1];
  
      if ((list_old.getRange(i+1, calendar_unterview_col+1).isChecked() == true) && (list_old.getRange(i+1, unterview_attended_col+1).isChecked() != true)) next_invite.appendRow([first,email]);
    }
    **/
  
}
  
/**
 * Function will process Unterview pearDeck output to mark unterview session attendance
 */
function processUnterviewAttendancePearDeck(roster, pear_sheet, pear) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var roster_sheet = ss.getSheetByName(roster);
  
    var data = roster_sheet.getRange(1,1,roster_sheet.getLastRow(),roster_sheet.getLastColumn()).getValues();
  
    var pear_total = pear[0].length - 4;
  
    var first_col = data[0].indexOf('First Name');
    var last_col = data[0].indexOf('Last Name');
    var email_col = data[0].indexOf('Email Address');    
    var alt_col = data[0].indexOf('Alternate Email');
  
      var pear_col = data[0].indexOf('Unterview Attended');
      Logger.log(pear_col);
  
      for (var j = 1; j < data.length; j++) {
        var roster_name = data[j][first_col] + " " + data[j][last_col];
        var roster_email = data[j][email_col].toLocaleString().toLocaleLowerCase();
        Logger.log("Finding "+roster_name + " " + roster_email);
        var alt_email = data[j][alt_col].toLocaleString().toLocaleLowerCase();
        for (var i = 0; i < pear.length; i++) {
          var pear_name = pear[i][1];
          var pear_email = pear[i][2].toLocaleLowerCase();
  
          // Estimate PearDeck Engagement
          var pear_engagement = 0;
          for (var p = 0; p < pear[i].length; p++) {
            if (pear[i][p] != "") {
              pear_engagement = pear_engagement + 1;
            }
          }
  
          if (pear_engagement > pear_total) pear_engagement = pear_total;
  
          if ((pear_email.toLocaleLowerCase == roster_email) || (alt_email.toLocaleString().includes(pear_email))) {
            roster_sheet.getRange(j+1,pear_col+1).setValue('TRUE');
            roster_sheet.getRange(j+1,pear_col+2).setValue((pear_engagement/pear_total)).setNumberFormat("##.#%");
            Logger.log(pear_name + " " + pear_engagement);
            pear_sheet.getRange(i+1,pear[i].length+1).setValue("Found");
            break;
          } else if (pear_name.replace(/\s/g, '') == roster_name.replace(/\s/g, '')) {
            roster_sheet.getRange(j+1,pear_col+1).setValue('TRUE');
            roster_sheet.getRange(j+1,pear_col+2).setValue((pear_engagement/pear_total)).setNumberFormat("##.#%");
            if (alt_email == '') {
              roster_sheet.getRange(j+1,alt_col+1).setValue(pear_email);
            } else {
              roster_sheet.getRange(j+1,alt_col+1).setValue(pear_email + ", " + alt_email);
            }
            Logger.log(pear_name +" " + alt_email + " new email = " + pear_email + " " + pear_engagement);
            pear_sheet.getRange(i+1,pear[i].length+1).setValue("Found");
            break;      
          }
        }
      }
}  

function processUnterviewPearDeck() {
    var pearSheet = "https://docs.google.com/spreadsheets/d/1I5Ov1H5lNCUUYq9a1du0hUVDuyDXEz-9IWpdTQGSRpk/edit#gid=608606362"
    var pear_sheet = SpreadsheetApp.openByUrl(pearSheet).getSheets()[0];
    var pear = pear_sheet.getDataRange().getValues();
  
    processUnterviewAttendancePearDeck('Form Responses 1', pear_sheet, pear);
  // DON'T NEED THIS ANYMORE  processUnterviewAttendancePearDeck('Students from Old Form', pear_sheet, pear);
  
}

/**
 * Function will create a list of students who haven't attended an unterview session as of date
 * Run this function after processing Unterview PearDeck
 */
function createNextUnterviewSessionInviteList() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 1');
    var next_invite = ss.getSheetByName('Next Session Invites');
  
    next_invite.clearContents();
    next_invite.appendRow(['First Name', 'Email']);
    var data = list.getDataRange().getValues();
    var first_col = data[0].indexOf("First Name");
    var last_col = data[0].indexOf("Last Name");
    var email_col = data[0].indexOf("Email Address");  
    
    var calendar_unterview_col = data[0].indexOf('Calendar Invite for Unterview');
    var unterview_attended_col = data[0].indexOf('Unterview Attended');
  
  
    for (var i = 1; i < data.length; i++) {
      var first = data[i][first_col];
      var email = data[i][email_col];
      if(data[i][first_col+1] != "") first = data[i][first_col+1];
  
      if ((list.getRange(i+1, calendar_unterview_col+1).isChecked() == true) && (list.getRange(i+1, unterview_attended_col+1).isChecked() != true)) next_invite.appendRow([first,email]);
    }
  
  
  /*** Don't NEED THIS ANYMORE
    var data_old = list_old.getDataRange().getValues();
  
    for (var i = 1; i < data_old.length; i++) {
      var first = data_old[i][first_col];
      var email = data_old[i][email_col]
  
      if(data_old[i][first_col+1] != "") first = data_old[i][first_col+1];
  
      if ((list_old.getRange(i+1, calendar_unterview_col+1).isChecked() == true) && (list_old.getRange(i+1, unterview_attended_col+1).isChecked() != true)) next_invite.appendRow([first,email]);
    }
    **/
  
}