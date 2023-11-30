function recommendedCourseMilestone() {
    changeStudentPathway('Wave 2', 'I. Open-Source & REU', 'IV. Wave 2: Open-Source & REU')

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var roster_sheet = ss.getSheetByName('Master Roster');
    var data = roster_sheet.getDataRange().getValues();
    var recommended_course_col = data[0].indexOf('Recommended Course');
    var recommended_milestone_col = data[0].indexOf('Recommended Milestone');
    var chosen_pathway_col = data[0].indexOf('Chosen Pathway');
    var pathway_pacing = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1RHzWh1jaxln4flrucHGoUX-Xa5eL2eC-ATMdza6u7ok/edit?usp=sharing').getSheetByName('2023-2024');
    var pathway_pacing_data = pathway_pacing.getDataRange().getValues();
    var pathway_date_col = pathway_pacing_data[1].indexOf('Date');
    console.log("pathway_date_col: ", pathway_date_col);
    console.log(pathway_pacing_data[1]);
    var today = new Date();
    var current_pathway_date_col;
    for (var i = 1; i < pathway_pacing_data.length; i++) {
        if (currentPathwayDate(pathway_pacing_data[i][pathway_date_col], today)) {
            current_pathway_date_col = i;
        }
    }
    console.log('current pathway date: ', pathway_pacing_data[current_pathway_date_col]);
    for (var i = 1; i < data.length; i++) {
        var chosen_pathway = data[i][chosen_pathway_col];
        if (chosen_pathway != '') {
            var number_chosen_pathway;
            if (chosen_pathway == 'I. Open-Source & REU') {
              number_chosen_pathway = 1;
            }
            else if (chosen_pathway == 'II. Spring Tech Internship') {
              number_chosen_pathway = 2;
            }
            else if( chosen_pathway == 'III. Fall Tech Internship') {
              number_chosen_pathway = 3;
            }
            else if ( chosen_pathway == 'IV. Wave 2: Open-Source & REU') {
              number_chosen_pathway = 4;
            }
            var student_pathway = 'Pathway ' + number_chosen_pathway;
            var pathway_course_col = pathway_pacing_data[0].indexOf(student_pathway);
            console.log("Student Pathway: ", student_pathway);
            var pathway_milestone_col = pathway_course_col + 1;
            var recommended_course = pathway_pacing_data[current_pathway_date_col][pathway_course_col];
            console.log("Recommended Course: ", recommended_course);
            var recommended_milestone = 'Milestone ' + pathway_pacing_data[current_pathway_date_col][pathway_milestone_col];
            console.log('Recommended Milestone: ', recommended_milestone);
            if (recommended_course != '' && recommended_milestone != '') {
                roster_sheet.getRange(i + 1, recommended_course_col + 1).setValue(recommended_course);
                roster_sheet.getRange(i + 1, recommended_milestone_col + 1).setValue(recommended_milestone);
            }
        }
    }
}

function currentPathwayDate(pathway_date, current_date) {
    var new_pathway_date = new Date(pathway_date).setHours(0, 0, 0, 0);
    var new_current_date = new Date(current_date).setHours(0, 0, 0, 0);
    console.log("Pathway Date: ", pathway_date);
    console.log("Current Date: ", current_date);
    if (new_pathway_date <= new_current_date) {
        return true;
    }
}

function changeStudentPathway(current_student_type, current_pathway, new_pathway) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var roster_sheet = ss.getSheetByName('Master Roster');
    var data = roster_sheet.getDataRange().getValues();
 
    var student_type_col = data[0].indexOf('Student Type');
    var chosen_pathway_col = data[0].indexOf('Chosen Pathway');
 
    for(var i = 1; i < data.length; i++) {
        var student_type = data[i][student_type_col];
        var chosen_pathway = data[i][chosen_pathway_col];
 
        if(student_type == current_student_type && chosen_pathway == current_pathway) {
            roster_sheet.getRange(i + 1, chosen_pathway_col + 1).setValue(new_pathway);
        }
    }
 }