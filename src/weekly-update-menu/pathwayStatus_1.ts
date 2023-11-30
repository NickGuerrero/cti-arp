function pathwayStatus()
{
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var roster_sheet = ss.getSheetByName('Master Roster');
    var data = roster_sheet.getDataRange().getValues();

    var pathway_status_col = data[0].indexOf('Pathway Status');
    var pathway_status_history_col = data[0].indexOf('Pathway Status History')
    var recommended_course_col = data[0].indexOf('Recommended Course');
    var recommended_milestone_col = data[0].indexOf('Recommended Milestone');

    var current_course_col = data[0].indexOf('Course');
    var current_milestone_col = data[0].indexOf('Milestone');


    for(var i = 1; i < data.length; i++) {
        var recommended_course = data[i][recommended_course_col];

        var recommended_milestone = data[i][recommended_milestone_col];

        var current_course = data[i][current_course_col];

        var current_milestone = data[i][current_milestone_col];

        if(recommended_course != '' && recommended_milestone != '' && current_course != '' && current_milestone != '')  {
            var milestone_difference = milestoneDifference(current_course, current_milestone, recommended_course, recommended_milestone);
            var today = new Date();
    
            roster_sheet.getRange(i + 1, pathway_status_col + 1).setValue(milestone_difference);
            roster_sheet.getRange(i + 1, pathway_status_history_col + 1).setValue(data[i][pathway_status_history_col] + '<' + today.toDateString() + ': ' + milestone_difference + '>,\n')
        }
    }
}