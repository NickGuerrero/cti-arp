function sendUnterviewSessionReminder() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
  
    var list;
    var draft;
  
    list = ss.getSheetByName('Unterview Reminder');
    draft = GmailApp.getDraft('r1974030530335826054');
    
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
    
    var status_col = data[0].indexOf('Status');
  
    var d = new Date();
    data.forEach(function(row, i) { 
      
      if ((row[status_col] == '')  && ((i >= 1) && (i < data.length))) {
        // variables
       var name = row[1];
       if (name != "") {
        var email = row[2];
        var status = row[status_col];
        var body = '<span style="font-family:arial,sans-serif;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;color:rgb(0,0,0);vertical-align:baseline;white-space:pre-wrap">'+ "Dear " + name + ",</span><br><br>" + draft.getMessage().getBody();
        var subject = name + ", " + draft.getMessage().getSubject();
        
        var ccemail ="";
          
          GmailApp.sendEmail(email, subject, "", { htmlBody: body, cc: ccemail, replyTo: "student_assistant@computingtalentinitiative.org"});
          list.getRange(i+1, status_col+1).setValue(d);
          Logger.log(name + ' ' + email + ' ' + ccemail + ' ' + i);
       }
      }
      
      });
}