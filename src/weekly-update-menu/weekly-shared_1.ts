// Compiled using becs-canvas-gradebook 1.0.0 (TypeScript 4.9.5)
function milestoneDifference(current_course, current_milestone, target_course, target_milestone) {
    var milestones_sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1iAuTPPeIBVo67018ityqVhPi3c_nHwq5hWQQnLgfwUo/edit?usp=sharing').getSheetByName('Progress');
    var milestones = milestones_sheet.getDataRange().getValues();
    var milestone_difference;
    var current_milestone_index;
    var target_milestone_index;
    var current_getting_started = 0;
    var target_getting_started = 0;

    if(current_course == 'Not Started' || current_course == '') {
      current_course = 101;
    }

    if(current_milestone == 'Not Started' || current_milestone == '') {
      current_milestone = 'Getting started';
    }
   
    for (var i = 1; i < milestones.length; i++) {

        if ((current_course == milestones[i][0]) && (current_milestone == milestones[i][1])) {
            current_milestone_index = i;
        }
        if ((target_course == milestones[i][0]) && (target_milestone == milestones[i][1])) {
            target_milestone_index = i;
        }
    }

    for(var i = 1; i < current_milestone_index; i++) {
      if(milestones[i]['1'] == 'Getting started') {
        current_getting_started = current_getting_started  + 1;
      }
    }

    for(var i = 1; i < target_milestone_index; i++) {
      if(milestones[i]['1'] == 'Getting started') {
        target_getting_started = target_getting_started  + 1;
      }
    }
    current_milestone_index = current_milestone_index - current_getting_started;
    target_milestone_index = target_milestone_index - target_getting_started;
    milestone_difference = current_milestone_index - target_milestone_index;

console.log("*************************************************")
    console.log("milestone difference: ", milestone_difference)
    console.log("current getting started: ", current_getting_started)
    console.log("target getting started: ", target_getting_started)

       console.log("current course: ", current_course)
    console.log("current milestone: ", current_milestone)
    console.log("current milestone index: ", current_milestone_index)

    console.log("target course: ", target_course)
    console.log("target milestone: ", target_milestone);
    console.log("target milestone index: ", target_milestone_index)
 console.log("**********************************************\n")

    return milestone_difference;
}

function changeColumnValues(worksheet, column_title, new_data) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var active_worksheet = ss.getSheetByName(worksheet);
    var worksheet_data = active_worksheet.getDataRange().getValues();
    var column_index = worksheet_data[0].indexOf(column_title);

    for(var i = 1; i < worksheet_data.length; i++) {
      var column_data = worksheet_data[i][column_index];
      column_data = new_data;
      active_worksheet.getRange(i + 1, column_index + 1).setValue(column_data)
    }
        
}