/***
 * Function will go through the table 'Form Responses 1' and create a list in tab 'CTI Unterview Canvas Invite'
 * The list will be of students who don't have their 'Unterview Canvas Added' column tick 
 */

function createUserList() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 8');
    
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
    var first_col = data[0].indexOf("First Name");
    var last_col = data[0].indexOf("Last Name");
    
    var unterview_canvas_col = data[0].indexOf("Unterview Canvas Added");
    var email_col = data[0].indexOf("Email Address");
  
    var output = ss.getSheetByName('Canvas Import CSV');
    output.clearContents();
    output.appendRow(['user_id',	'integration_id',	'login_id',	'password',	'first_name',	'last_name',	'full_name',	'sortable_name',	'short_name',	'email',	'status']);
  
    for (var i = 1; i < data.length; i++) {
      if (list.getRange(i+1, unterview_canvas_col+1).isChecked() != true) {
        var first = data[i][first_col];
        var last = data[i][last_col];
        var email = data[i][email_col];
        output.appendRow([email,'', email,'', first, last, '','','', email, 'active']);
      }
    }
    createRecruitmentSummary();
  }