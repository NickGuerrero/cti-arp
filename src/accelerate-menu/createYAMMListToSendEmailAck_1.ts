/***
 * Function will create a new tab with todays date as the name and add students <Name, Email> to send email ack
 */
function createYAMMListToSendEmailAck() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 8');
    
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
    var first_col = data[0].indexOf("First Name");
    var last_col = data[0].indexOf("Last Name");
    
    var unterview_canvas_col = data[0].indexOf("Unterview Canvas Added");
    var email_ack_col = data[0].indexOf("Sent Email Ack");
  
    var email_col = data[0].indexOf("Email Address");
  
    var today = new Date();
    var output = ss.insertSheet(today.toDateString() +"-" + "YAMM");
  
    output.appendRow(['Name',	'Email Address']);
  
    for (var i = 1; i < data.length; i++) {
      if ((list.getRange(i+1, unterview_canvas_col+1).isChecked() == true) && (list.getRange(i+1, email_ack_col+1).isChecked() != true)) {
        var first = data[i][first_col];
        if (data[i][first_col+1] != '') {
          first = data[i][first_col+1];
        } 
        var last = data[i][last_col];
        var email = data[i][email_col];
        output.appendRow([first, email]);
      }
    }
  }