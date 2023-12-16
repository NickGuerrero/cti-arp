function processCanvasUnterviewGradebook() {
    getUnterviewGradebook();
    grabCanvasIDFromUnterviewGradebook();
    canvasUnterviewUpdateSheets();
}

function getUnterviewGradebook() {
    var courseId = 5;
   var courseTitle = "Canvas Unterview Gradebook";
   var courseSection = "Target Summer 2024";

   console.log("course id", courseId);
   console.log("course title", courseTitle)
   console.log("course section", courseSection)
   var canvasGradebook = getCanvasGradebook(courseId, courseTitle, courseSection);

   updateSpreadSheetView(courseTitle, canvasGradebook);
}

/***
 * Identify students and add their CanvasID to the master sheet
 */
function grabCanvasIDFromUnterviewGradebook() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 8');
    var roster = list.getDataRange().getValues();
    var canvas_id_col = roster[0].indexOf('Canvas ID');
    var email_col = roster[0].indexOf('Email Address')
    var alt_col = roster[0].indexOf('Alternate Email');
  
    var gradebook_data = ss.getSheetByName('Canvas Unterview Gradebook').getDataRange().getValues();
  
    for (var i = 1; i < roster.length; i++) {
      for (var j = 1; j < gradebook_data.length; j++) {
        if (roster[i][email_col].toLocaleString().toLocaleLowerCase() == gradebook_data[j][3].toLocaleString().toLocaleLowerCase()) {
          list.getRange(i+1, canvas_id_col+1).setValue(gradebook_data[j][1]);
          break;
        } else if (roster[i][alt_col] != '') {
            if (roster[i][alt_col].toLocaleString().toLocaleLowerCase() == gradebook_data[j][3].toLocaleString().toLocaleLowerCase()) {
              list.getRange(i+1, canvas_id_col+1).setValue(gradebook_data[j][1]);
              break;
            }
        }
      }
  
    }
}

function canvasUnterviewUpdateSheets() {
    canvasUnterviewUpdateBySheets('Form Responses 1');
    canvasUnterviewUpdateBySheets('Form Responses 8');
}

/***
 * Function will process the 'Canvas Unterview Gradebook' tab and update if they have accessed Canvas
 * and it they have earned a 3 in the commitment quiz
 */
function canvasUnterviewUpdateBySheets(sheet) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName(sheet);
    Logger.log ("Processing Unterview ...  " + sheet)
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
    var first_col = data[0].indexOf("First Name");
    var last_col = data[0].indexOf("Last Name");
    var email_col = data[0].indexOf("Email Address");
    var alt_col = data[0].indexOf("Alternate Email");
    var canvas_col = data[0].indexOf('Unterview Canvas Accessed');
    var commitment_col = data[0].indexOf('Commitment Quiz Score');
    var canvas_id_col = data[0].indexOf('Canvas ID');
  
    var canvas_sheet = ss.getSheetByName('Canvas Unterview Gradebook');
    var canvas = canvas_sheet.getDataRange().getValues();
    var canvas_data_length = canvas[0].length;
   // var canvas_commmitment_col = canvas[0].indexOf('CTI Accelerate - Commitment Quiz (96)');
   // var canvas_culture_col = canvas[0].indexOf('CTI Culture - Review Quiz  (95)');
    var canvas_commmitment_col = findColInGradeBook(canvas[0],'CTI Accelerate - Commitment Quiz (96)');
    var canvas_culture_col = findColInGradeBook(canvas[0],'CTI Culture - Review Quiz  (95)');
  
    Logger.log(canvas_commmitment_col);
  
    for (var j = 2; j < canvas.length; j++) {
    var found = false;
  
      for (var i = 1; i < data.length; i++) {
        var first = data[i][first_col];
        var last = data[i][last_col];
        var email = data[i][email_col];
        var alt_email = data[i][alt_col];
        var canvas_id = data[i][canvas_id_col];
      
        if (((canvas[j][3].toString().toLocaleLowerCase() == email.toString().toLocaleLowerCase()) || (canvas[j][3].toString().toLowerCase() == alt_email.toString().toLowerCase()) || (last+", "+first == canvas[j][0]) || (canvas[j][1] == canvas_id))) {
            if (canvas[j][canvas_culture_col] != "") { // They have access the FIRST module in Unterview
              found = true;
              list.getRange(i+1, canvas_col+1).setValue('TRUE');
              list.getRange(i+1, commitment_col+1).setValue(canvas[j][canvas_commmitment_col]);
            }
            canvas_sheet.getRange(j+1,canvas_data_length+1).setValue("FOUND in Unterview");
            Logger.log('Found ' + first + " " +last + " = " + canvas[j][canvas_commmitment_col]);
            break;
          }
      }
  
      /*
      if (found == false) {
        list.appendRow(['Canvas Score',canvas[j][0], canvas[j][1], canvas[j][3], canvas[j][canvas_commmitment_col]]);
      } else {
        found = false;
      }
     */
  
    }
}