/***
 * Function will append rows to the 'Accelerate 101 Invites' tab with students who have completed the commitment quiz
 */
function create101UserListBySheet(sheet) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName(sheet);
    
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
    var first_col = data[0].indexOf("First Name");
    var last_col = data[0].indexOf("Last Name");
    
    var commitment_quiz_col = data[0].indexOf("Commitment Quiz Score");
    var accelerate_101_col = data[0].indexOf("Accelerate 101 Canvas Invite");
  
    var email_col = data[0].indexOf("Email Address");
  
    var today = new Date();
    var output = ss.getSheetByName('Accelerate 101 Invites');
    output.appendRow([today, sheet])
  
    for (var i = 1; i < data.length; i++) {
      if ((data[i][commitment_quiz_col] == 3) &&(list.getRange(i+1, accelerate_101_col+1).isChecked() != true)) {
        var first = data[i][first_col];
        var last = data[i][last_col];
        var email = data[i][email_col];
        output.appendRow([first, last, email]);
        list.getRange(i+1, accelerate_101_col+1).setValue('TRUE');
      }
    }
  
  }
  
  function create101UserList() {
   // DON'T NEED THIS ANYMORE create101UserListBySheet('Students from Old Form');
    create101UserListBySheet('Form Responses 1');
  }