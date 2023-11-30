/***
 * Function to create nudge list of students 
 * Two types:
 * Nudge 1 - Access Canvas Unterview and get started (you have received invite to Unterview, but haven't accessed it yet)
 * Nudge 2 - Make progress to complete Unterview (you have accessed Unterview, but not completed all the way to committment quiz)
 * Nudge 3 - Get started on 101 - (Got invited to 101, but haven't accessed it yet)
 */
function createNudgeList() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 1');
    var nudge1 = ss.getSheetByName('Nudge 1');
    var nudge2 = ss.getSheetByName('Nudge 2');
    var nudge3 = ss.getSheetByName('Nudge 3')
  
    nudge1.appendRow([new Date()]);
    nudge2.appendRow([new Date()]);
    nudge3.appendRow([new Date()]);
  
  
    var data = list.getDataRange().getValues();
    var first_col = data[0].indexOf("First Name");
    var last_col = data[0].indexOf("Last Name");
    var email_col = data[0].indexOf("Email Address");  
    
    var canvas_unterview_col = data[0].indexOf('Unterview Canvas Added');
    var catalog_enrolled_col = data[0].indexOf('Accelerate Catalog Enrolled');
    var unterview_accessed_col = data[0].indexOf('Unterview Canvas Accessed');
    var commitment_quiz_col = data[0].indexOf('Commitment Quiz Score');
    var accelerate_101_invite_col = data[0].indexOf('Accelerate 101 Canvas Invite');
    var accelerate_101_accessed_col = data[0].indexOf('Accelerate 101 Canvas Signup');
  
    for (var i = 1; i < data.length; i++) {
      var first = data[i][first_col];
      var email = data[i][email_col];
      var submit_time = data[i][0];
      if(data[i][first_col+1] != "") first = data[i][first_col+1];
      var catalog_enrolled_text = "NOT Enrolled";
  
      if (list.getRange(i+1, catalog_enrolled_col+1).isChecked() == true) catalog_enrolled_text = "Enrolled";
      if ((list.getRange(i+1, canvas_unterview_col+1).isChecked() == true) && (list.getRange(i+1, unterview_accessed_col+1).isChecked() != true)) nudge1.appendRow([submit_time,first,email, catalog_enrolled_text]);
      if ((list.getRange(i+1, unterview_accessed_col+1).isChecked() == true) && (data[i][commitment_quiz_col] == '')) nudge2.appendRow([submit_time,first,email, catalog_enrolled_text]) ;
      if ((list.getRange(i+1, accelerate_101_invite_col+1).isChecked() == true) && (list.getRange(i+1, accelerate_101_accessed_col+1).isChecked() != true)) nudge3.appendRow([submit_time,first,email, catalog_enrolled_text]) ;
    }
  
  }