/***
 * Update Unterview Data to find people who have access Unterview and/ completed committment quiz
 * Those who completed will be moved to 101
 * Update 101 data to see if they have accessed the course
 *  - also update progress through milestone for 101
 */

function canvasUpdate() {
    // canvas101Update();
     canvasUpdateProgress();
   //  createRecruitmentSummary();
}

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

function canvasUpdateProgressThroughCourse(roster_tab, course) {
    var today = new Date();
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var roster_sheet = ss.getSheetByName(roster_tab);
    var roster = roster_sheet.getDataRange().getValues();
  
    var canvas_id_col = roster[0].indexOf('Canvas ID');
    var course_col = roster[0].indexOf('Course');
    var progress_col = roster[0].indexOf('Milestone');
    var progress_hist_col = roster[0].indexOf("History");
    var num_of_col = roster[0].indexOf('# of Inactive Weeks');
  
    var milestones_sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1iAuTPPeIBVo67018ityqVhPi3c_nHwq5hWQQnLgfwUo/edit?usp=sharing').getSheetByName('Progress');
    var milestones = milestones_sheet.getDataRange().getValues();
  
    var grades_tab = 'Canvas ' + course;
    var grades = ss.getSheetByName(grades_tab).getDataRange().getValues();
  
    var milestones_col = [0];
    for (var m = 1; m < milestones.length; m++) {
      Logger.log(milestones[m][2]);
      var col = findColInGradeBook(grades[0], milestones[m][2]);
      milestones_col.push(col);
    }
  
  
    var milestones_count = new Array(milestones.length).fill(0);
  
  
    /* Go through roster to update milestone in the progress column */
    for (var i = 1; i < roster.length; i++) {
      var found_in_gradebook = false;
      if (isCourseBefore(course, roster[i][course_col])) continue;
      Logger.log('Looking for ... ' + roster[i][2] + " " + roster[i][1] + " in " + roster[i][course_col]);
      for (var j = 2; j < grades.length; j++) {
        if (roster[i][canvas_id_col] == grades[j][1]) {
          found_in_gradebook = true;
          Logger.log('Found ' + roster[i][canvas_id_col] + " == " + grades[j][1]);
          if (roster[i][course_col] != course) {
            roster_sheet.getRange(i+1, course_col+1).setValue(course);
            roster_sheet.getRange(i+1, progress_col+1).setValue('Getting started');
            roster_sheet.getRange(i+1, num_of_col+1).setValue(0);
          }  
          
          var found_milestone_progress = false;
  
          for (var m = milestones_col.length-1; m >= 1; m--) {
            
            if (milestones[m][0] != course) continue;
            //Added N/A Condition
            if ((grades[j][milestones_col[m]] != "N/A") && (grades[j][milestones_col[m]] > 0)) {
              found_milestone_progress = true;
              var history = roster[i][progress_hist_col];
              var previous = roster[i][progress_col];
              if (history != "") history = history + ", ";
              history = history + "<" + today.toDateString() + ": " + course +": " + milestones[m][1]+">";
              roster_sheet.getRange(i+1, progress_hist_col+1).setValue(history);
              roster_sheet.getRange(i+1, progress_col+1).setValue(milestones[m][1]);
              Logger.log(previous + " == " + milestones[m][1])
              if (previous == milestones[m][1]) {
                roster_sheet.getRange(i+1, num_of_col+1).setValue(roster[i][num_of_col]+1);      
              } else {
                roster_sheet.getRange(i+1, num_of_col+1).setValue(0);         
              }
              milestones_count[m] = milestones_count[m] + 1;
              Logger.log('Milestone = ' + milestones[m][0] + ' Count = ' +  milestones_count[m]);
              break;
            }
          }
          if (found_milestone_progress == false) {
            roster_sheet.getRange(i + 1, num_of_col + 1).setValue(roster[i][num_of_col] + 1);
            var history = roster[i][progress_hist_col];
            if (history != "") history = history + ", ";
            history =
              history +
              "<" +
              today.toDateString() +
              ": " +
              course +
              ": " +
              'Getting started' +
              ">";
             roster_sheet
               .getRange(i + 1, progress_hist_col + 1)
               .setValue(history);
          }
        }
      }
    }
  
  /* NOT SURE WE NEED TO KEEP TRACK OF NUMBERS
    var milestones_len = milestones[0].length + 1;
    var today = new Date();
    var total_in_course = 0;
    milestones_sheet.getRange(1,milestones_len).setValue(today.toDateString())
    for (var m = 1; m < milestones.length; m ++) {
      milestones_sheet.getRange(m+1, milestones_len).setValue(milestones_count[m]);
      total_in_course = total_in_course + milestones_count[m];
    }
     milestones_sheet.getRange(milestones_count.length, milestones_len).setValue(total_in_course);
  */
  
}

/***
 * Check if course1 is before course 2
 */
function isCourseBefore(course1, course2) {
    var course_list = ["101", "101A", "201", "201A", "202","202A", "301", "301A", "302", "302A", "303"];
  
    var course1_index = course_list.indexOf(course1.toLocaleString());
    var course2_index = course_list.indexOf(course2.toLocaleString());
  
    if (course1_index < course2_index) {
      return true;
    } else {
      return false;
    }
}