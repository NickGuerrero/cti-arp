// Determine whether student is beyond X milestone (X because it may change)
// Is A greater than B?
// Does NOT calculate milestone difference, only calculates if a milestone is bigger or smaller (hence compare)
function compareMilestone(course_a, milestone_a, course_b, milestone_b){
    var num_mile = 11; // Max number of milestones per course, used to determine base (Like Base-11) 
    const course_mapping = new Map([
        [101, 1 * num_mile],
        ["101A", 2 * num_mile],
        [201, 3 * num_mile],
        ["201A", 4 * num_mile],
        [202, 5 * num_mile],
        ["202A", 6 * num_mile],
        [301, 7 * num_mile],
        ["301A", 8 * num_mile],
        [302, 9 * num_mile],
        ["302A", 10 * num_mile],
        [303, 11 * num_mile],
    ]);
    const milestone_mapping = new Map([
        ["Getting Started", 0],
        ["Milestone 1", 1],
        ["Milestone 2", 2],
        ["Milestone 3", 3],
        ["Milestone 4", 4],
        ["Milestone 5", 5],
        ["Milestone 6", 6],
        ["Milestone 7", 7],
        ["Milestone 8", 8],
        ["Milestone 9", 9],
        ["Milestone 10", 10],
    ])

    let score_a = 0; let score_b = 0;
    if(course_mapping.has(course_a)) score_a += course_mapping.get(course_a);
    if(course_mapping.has(course_b)) score_b += course_mapping.get(course_b);
    if(milestone_mapping.has(milestone_a)) score_a += milestone_mapping.get(milestone_a);
    if(milestone_mapping.has(milestone_b)) score_b += milestone_mapping.get(milestone_b);
    return score_a - score_b;
}

// Get the next set of REU students
function filterREUStudents() {
    // REU Requirement
    const REU_COURSE = 202 // 202
    const REU_MILESTONE = "Milestone 5" // M5

    // Get Master Roster data
    // Use below to test without attaching library to script (Example Sheet, not publicly editable, but viewable)
    //var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1nGLWhzUr9gDnNgEwEI6IR27uv4Ex5Gqj33IQlrtMcbE/edit?usp=sharing')
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var roster_data = ss.getSheetByName("Master Roster").getDataRange().getValues();
    var reu_data = ss.getSheetByName("REU Roster").getDataRange().getValues();

    // Get the REU roster to check for repeats
    let reu_canvas_id_col = reu_data[0].indexOf("Canvas ID");
    const reu_set = new Set();
    for(let i = 1; i < reu_data.length; i++){
        reu_set.add(reu_data[i][reu_canvas_id_col]);
    }

    // Get columns to copy over
    const copy_col = [
        roster_data[0].indexOf("First Name"),
        roster_data[0].indexOf("Preferred Name [if different than first name]"),
        roster_data[0].indexOf("Last Name"),
        roster_data[0].indexOf("Canvas ID"),
        roster_data[0].indexOf("Email Address"),
        roster_data[0].indexOf("Would you consider yourself a first-generation college student?"),
        roster_data[0].indexOf("What term best describes your gender identity?"),
        roster_data[0].indexOf("With which race and/or ethnic group(s) do you most closely identify? [Select all that apply.]"),
        roster_data[0].indexOf("Alternate Email"),
        roster_data[0].indexOf("What is the name of the institution you currently attend?"),
        roster_data[0].indexOf("Student Type"),
        roster_data[0].indexOf("Status (Active or Not Active)")
    ]

    // Filter out REU eligible students
    let roster_canvas_id_col = roster_data[0].indexOf("Canvas ID");
    let course_col = roster_data[0].indexOf("Course");
    let milestone_col =  roster_data[0].indexOf("Milestone");
    var reu_eligible_students = [];
    for(let i = 1; i < roster_data.length; i++){
        if(!(reu_set.has(roster_data[i][roster_canvas_id_col]))){
            if(compareMilestone(roster_data[i][course_col], roster_data[i][milestone_col], REU_COURSE, REU_MILESTONE) >= 0){
                reu_eligible_students.push([
                    roster_data[i][copy_col[0]],
                    roster_data[i][copy_col[1]],
                    roster_data[i][copy_col[2]],
                    roster_data[i][copy_col[3]],
                    roster_data[i][copy_col[4]],
                    roster_data[i][copy_col[5]],
                    roster_data[i][copy_col[6]],
                    roster_data[i][copy_col[7]],
                    roster_data[i][copy_col[8]],
                    roster_data[i][copy_col[9]],
                    roster_data[i][copy_col[10]],
                    roster_data[i][copy_col[11]],
                    'Form Not Completed'
                ]);
            }
        }
    }

    // Push new eligible students to the REU roster
    if(reu_eligible_students.length > 0){
        let row_st = ss.getSheetByName("REU Roster").getLastRow() + 1;
        ss.getSheetByName("REU Roster").getRange(
            row_st, 1, reu_eligible_students.length, reu_eligible_students[0].length
        ).setValues(reu_eligible_students);
    }
    console.log("Processed " + reu_eligible_students.length.toString() + " new students");
    return;
}

function processREUInterestForm(){
    const FORM_BOOKMARK = "R1" // Keep record of last form on sheet, cell location on REU Roster Sheet. Value is 1-indexed

    // Use below to test without attaching library to script (Example Sheet, not publicly editable, but viewable)
    //var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1nGLWhzUr9gDnNgEwEI6IR27uv4Ex5Gqj33IQlrtMcbE/edit?usp=sharing')
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var reu_roster = ss.getSheetByName("REU Roster");
    var reu_forms = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1pmwPMHPrsJTXWk-4Obx5RDzoyHuyU24f2dU0Y0nCevA/edit?usp=sharing').getSheetByName('Form Responses 1');
    
    // Determine how many forms need to be processed
    var next_row_process = reu_roster.getRange(FORM_BOOKMARK).getValue();
    if(reu_forms.getLastRow() <= next_row_process - 1){
        console.log("No forms to process");
        return;
    }

    // Create email mapping to check by rows
    var email_mapping = new Map();
    var reu_roster_data = reu_roster.getDataRange().getValues();
    var reu_email_col = reu_roster_data[0].indexOf("Email Address");
    var reu_alt_col = reu_roster_data[0].indexOf("Alternate Email");
    var alt_arr = [];
    for(let i = 1; i < reu_roster_data.length; i++){
        email_mapping.set(reu_roster_data[i][reu_email_col].toLowerCase(), i);
        if(reu_roster_data[i][reu_alt_col] != ""){
            alt_arr = reu_roster_data[i][reu_alt_col].replace(/^,+|,+$/g, "").split(",");
            for(let j = 0; j < alt_arr.length; j++){
                if(alt_arr[j] != ""){
                    email_mapping.set(alt_arr[j].toLowerCase(), i);
                }
            }
        }
    }

    // Map forms to the correct row
    var reu_forms_data = reu_forms.getDataRange().getValues();
    // Timestamp, Name on Form, Pursue REU group Y/N, Weekday Availability, Sunday Availability
    const copy_col = [0, 1, 3, 4, 5];
    var col_st = reu_roster_data[0].indexOf("Form Completed Date (Timestamp)");
    var col_end = reu_roster_data[0].indexOf("Despite above, are you also available Sunday after hours (after 9:30 PM) for one-on-one REU consultation? ");
    var num_forms_processed = 0;
    for(let i = next_row_process; i < reu_forms_data.length; i++){ // -1 to account for 1-indexing
        if(email_mapping.has(reu_forms_data[i][2].toLowerCase())){
            // +1 to account for 0-indexing
            reu_roster.getRange(email_mapping.get(reu_forms_data[i][2].toLowerCase()) + 1, col_st + 1, 1, col_end - col_st + 1).setValues(
                [[reu_forms_data[i][copy_col[0]],
                reu_forms_data[i][copy_col[1]],
                reu_forms_data[i][copy_col[2]],
                reu_forms_data[i][copy_col[3]],
                reu_forms_data[i][copy_col[4]]]]
            );
            num_forms_processed += 1;
        } else {
            console.log("WARNING: Email not found for " + reu_forms_data[i][2].toLowerCase());
        }
    }
    reu_roster.getRange(FORM_BOOKMARK).setValue(reu_forms.getLastRow() + 1); // Set bookmark
    console.log("Processed " + num_forms_processed.toString() + " forms");
    return;
}

// TODO: Parking Lot
function updateREUAttendance(){
    // Base off of existing PearDeck Scripts
    // For each sheet, fetch peardeck score & use it to update
}