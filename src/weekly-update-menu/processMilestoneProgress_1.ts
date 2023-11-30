// Compiled using becs-canvas-gradebook 1.0.0 (TypeScript 4.9.5)
function processMilestoneProgress() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var roster_sheet = ss.getSheetByName('Master Roster');
    var data = roster_sheet.getDataRange().getValues();
    var course_col = data[0].indexOf('Course');
    var milestone_col = data[0].indexOf('Milestone');
    var history_col = data[0].indexOf('History');
    var chosen_pathway_col = data[0].indexOf('Chosen Pathway');
    var weekly_progress_score_col = data[0].indexOf('Weekly Progress Score');
    var last_week_progress_col = data[0].indexOf('Last Week Progress Metric');
    var min_milestones;
    var weekly_progress_score;
    var overall_progress_metric;

    changeColumnValues('Master Roster', 'Weekly Progress Score', 0)

    for (var i = 1; i < data.length; i++) {
        console.log('Processing ... ' + data[i][0] + ' ' + data[i][2]);

        var current_history = data[i][history_col];
        if (current_history) {
            var current_course = data[i][course_col];
            var current_milestone = data[i][milestone_col];
            var chosen_pathway = data[i][chosen_pathway_col];
            var weekly_progress_score = data[i][weekly_progress_score_col];
            var last_week_progress = data[i][last_week_progress_col];
            var history = current_history.split(",");
            var previous_course = history.pop();
            var prev_prev_course = history.pop();
            var milestone_difference;


            if (prev_prev_course) {
              var last_course_milestone = prev_prev_course.replace(/[<>{}]/g, '').split(':');
              var last_course = last_course_milestone[1].substring(1);
              var last_milestone = last_course_milestone[2].substring(1);
            } else {
              var last_course_milestone = previous_course.replace(/[<>{}]/g, '').split(':');
              var last_course = last_course_milestone[1].substring(1);
              var last_milestone = 'Getting started';
            }

            if (last_week_progress == '') {
                last_week_progress = 0;
            }

            milestone_difference = milestoneDifference(current_course, current_milestone, last_course, last_milestone);

            
            min_milestones = getMinimumMilestone(chosen_pathway);
            console.log("minimum milestone: ", min_milestones);
            
            weekly_progress_score = ((milestone_difference / min_milestones) * 100);
            console.log("weekly progress score: ", weekly_progress_score);
            console.log("**********************************************")


            roster_sheet.getRange(i + 1, weekly_progress_score_col + 1).setValue(weekly_progress_score);
            if (weekly_progress_score == '' && last_week_progress == '') {
                overall_progress_metric = weekly_progress_score * 1.0;
            }
            else {
                overall_progress_metric = (last_week_progress * 0.8) + (weekly_progress_score * 0.2);
            }
            roster_sheet.getRange(i + 1, last_week_progress_col + 1).setValue(overall_progress_metric);
        }
    }
}

// Compiled using becs-canvas-gradebook 1.0.0 (TypeScript 4.9.5)
function getMinimumMilestone(chosen_pathway) {
    if (chosen_pathway == 'II. Spring Tech Internship') {
        return 3;
    }
    else if (chosen_pathway == 'III. Fall Tech Internship') {
        return 4;
    }
    else {
        return 2;
    }
}
