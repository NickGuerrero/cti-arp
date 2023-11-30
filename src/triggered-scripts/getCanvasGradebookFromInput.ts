function getCanvasGradebookFromInput() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var input_sheet = ss.getSheetByName('Input');
    var course_input = input_sheet.getDataRange().getValues();


    for (var i = 1; i < course_input.length; i++) {
      console.log("course input", course_input[i])
      var courseId = course_input[i][0];
      var courseTitle = course_input[i][1];
      var courseSection = course_input[i][2]

      console.log("course id", courseId);
      console.log("course title", courseTitle)
      console.log("course section", courseSection)
      var canvasGradebook = getCanvasGradebook(courseId, courseTitle, courseSection);

      updateSpreadSheetView(courseTitle, canvasGradebook);
    }
}
