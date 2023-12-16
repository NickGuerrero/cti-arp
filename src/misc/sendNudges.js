function sendNudgesByNum(num) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
  
    var list;
    var draft;
  
    if (num == 1) {
      list = ss.getSheetByName('Nudge 1');
      draft = GmailApp.getDraft('r-3434320761492069169');
    }
    else if (num == 2) {
      list = ss.getSheetByName('Nudge 2');
      draft = GmailApp.getDraft('r8567888331889024661');
    } else {
      list = ss.getSheetByName('Nudge 3');
      draft = GmailApp.getDraft('r-3822712631516428638');
    }
    
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
    
    var status_col = data[0].indexOf('Status');
  
    var d = new Date();
    data.forEach(function(row, i) { 
      
      if ((row[status_col] == '')  && ((i >= 1) && (i <= 1))) {
        // variables
       var name = row[1];
       if (name != "") {
        var email = row[2];
        var status = row[status_col];
        var body = '<span style="font-family:arial,sans-serif;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;color:rgb(0,0,0);vertical-align:baseline;white-space:pre-wrap">'+ "Dear " + name + ",</span><br><br>" + draft.getMessage().getBody();
        var subject = name + ", " + draft.getMessage().getSubject();
        
        var ccemail ="";
          
          GmailApp.createDraft(email, subject, "", { htmlBody: body, cc: ccemail});
          list.getRange(i+1, status_col+1).setValue(d);
          Logger.log(name + ' ' + email + ' ' + ccemail + ' ' + i);
       }
      }
      
      });
  }
  
function sendNudges() {
    sendNudgesByNum(1);
    sendNudgesByNum(2);
    sendNudgesByNum(3);
}