function canvasUpdateProgress() {
    canvasUpdateProgressThroughCourse('Master Roster','101');
    canvasUpdateProgressThroughCourse('Master Roster','101A');
    canvasUpdateProgressThroughCourse('Master Roster','201');
    canvasUpdateProgressThroughCourse('Master Roster','201A');
    canvasUpdateProgressThroughCourse('Master Roster','202');
    canvasUpdateProgressThroughCourse('Master Roster','301');
    canvasUpdateProgressThroughCourse('Master Roster','301A');
    canvasUpdateProgressThroughCourse('Master Roster','302');
    canvasUpdateProgressThroughCourse('Master Roster','303');
  }
  
  function canvasUpdateProgressForInactive() {
    canvasUpdateProgressThroughCourse('Inactive Students','101');
    canvasUpdateProgressThroughCourse('Inactive Students','101A');
    canvasUpdateProgressThroughCourse('Inactive Students','201');
    canvasUpdateProgressThroughCourse('Inactive Students','201A');
    canvasUpdateProgressThroughCourse('Inactive Students','202');
    canvasUpdateProgressThroughCourse('Inactive Students','301');
    canvasUpdateProgressThroughCourse('Inactive Students','301A');
    canvasUpdateProgressThroughCourse('Inactive Students','302');
    canvasUpdateProgressThroughCourse('Inactive Students','303');
  }
  
  /***
   * Function will process the 'Canvas 101' tab and update if they have accessed the course on Canvas
   */
  function canvas101UpdateBySheets(sheet) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName(sheet);
    Logger.log ("Processing Accelerate 101 ...  " + sheet)
    
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
    var first_col = data[0].indexOf("First Name");
    var last_col = data[0].indexOf("Last Name");
    var email_col = data[0].indexOf("Email Address");
    var alt_col = data[0].indexOf("Alternate Email");
    var canvas_invite_col = data[0].indexOf('Accelerate 101 Canvas Invite');
    var canvas_accessed_col = data[0].indexOf('Accelerate 101 Canvas Signup');
  
    var canvas_id_col = data[0].indexOf('Canvas ID');
  
    var canvas_sheet = ss.getSheetByName('Canvas 101');
    var canvas = canvas_sheet.getDataRange().getValues();
    var canvas_deep_access = canvas[0].indexOf('PlayPosit: Importance of Deep Work (3:09) (57)');
  
    var canvas_data_length = canvas[0].length;
  
    for (var j = 2; j < canvas.length; j++) {
    var found = false;
  
      for (var i = 1; i < data.length; i++) {
        var first = data[i][first_col];
        var last = data[i][last_col];
        var email = data[i][email_col];
        var alt_email = data[i][alt_col];
        var canvas_id = data[i][canvas_id_col];
      
          if ((canvas[j][3].toString().toLocaleLowerCase() == email.toString().toLocaleLowerCase()) || (canvas[j][3].toString().toLowerCase() == alt_email.toString().toLowerCase()) || (last+", "+first == canvas[j][0]) || (canvas[j][1] == canvas_id)) {
            found = true;
            list.getRange(i+1, canvas_invite_col+1).setValue('TRUE');
            if (canvas[j][canvas_deep_access] != "") list.getRange(i+1, canvas_accessed_col+1).setValue('TRUE');
            canvas_sheet.getRange(j+1,canvas_data_length+1).setValue("FOUND in 101");
            Logger.log(first + " " +last );
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
  
  function canvas101Update() {
  // DON'T NEED THIS ANYMORE  canvas101UpdateBySheets('Students from Old Form');
    canvas101UpdateBySheets('Form Responses 1');
  }
  