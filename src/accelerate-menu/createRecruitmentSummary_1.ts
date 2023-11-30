/***
 * Function will create a summary of numbers
 */
function createRecruitmentSummary() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 1');
  
    var data = list.getDataRange().getValues();
    var canvas_unterview_col = data[0].indexOf('Unterview Canvas Added');
    var emailed_col = data[0].indexOf('Sent Email Ack');
    var calendar_invite_col = data[0].indexOf('Calendar Invite for Unterview');
    var unterview_accessed_col = data[0].indexOf('Unterview Canvas Accessed');
    var commitment_quiz_col = data[0].indexOf('Commitment Quiz Score');
    var accelerate_101_invite_col = data[0].indexOf('Accelerate 101 Canvas Invite');
    var accelerate_101_accessed_col = data[0].indexOf('Accelerate 101 Canvas Signup');
    var attended_unterview_col = data[0].indexOf('Unterview Attended');
    var catalog_enrolled_col = data[0].indexOf('Accelerate Catalog Enrolled');
  
    var applications = data.length + 1;
    var canvas_unterview = 0;
    var emailed = 0;
    var calendar_invite = 0;
    var canvas_unterview_accessed = 0;
    var completed_unterview = 0;
    var accelerate_101_invited = 0;
    var accelerate_101_accessed = 0;
    var attended_unterview = 0;
    var catalog_enrolled = 0;
  
    for (var i = 1; i < data.length; i++) {
      Logger.log(i);
      if (list.getRange(i+1, canvas_unterview_col+1).isChecked() == true) canvas_unterview = canvas_unterview + 1;
      if (list.getRange(i+1, emailed_col+1).isChecked() == true) emailed = emailed + 1;
      if (list.getRange(i+1, calendar_invite_col+1).isChecked() == true) calendar_invite = calendar_invite + 1;
      if (list.getRange(i+1, unterview_accessed_col+1).isChecked() == true) canvas_unterview_accessed = canvas_unterview_accessed + 1;
      if (data[i][commitment_quiz_col] != '') completed_unterview = completed_unterview + 1;
      if (list.getRange(i+1, accelerate_101_invite_col+1).isChecked() == true) accelerate_101_invited = accelerate_101_invited + 1;
      if ((data[i][commitment_quiz_col] == '') && (list.getRange(i+1, accelerate_101_invite_col+1).isChecked() == true)) Logger.log(data[i][2] + " Got into 101 without completed Unterview?");
      if (list.getRange(i+1, accelerate_101_accessed_col+1).isChecked() == true) accelerate_101_accessed = accelerate_101_accessed + 1;
      if (list.getRange(i+1, attended_unterview_col+1).isChecked() == true) attended_unterview = attended_unterview + 1;
      if (list.getRange(i+1, catalog_enrolled_col+1).isChecked() == true) catalog_enrolled = catalog_enrolled + 1;
  
    }
  
  /*** DON'T NEED THIS ANYMORE
    for (var i = 1; i < data_old.length; i++) {
      if (list_old.getRange(i+1, canvas_unterview_col+1).isChecked() == true) canvas_unterview = canvas_unterview + 1;
      if (list_old.getRange(i+1, emailed_col+1).isChecked() == true) emailed = emailed + 1;
      if (list_old.getRange(i+1, calendar_invite_col+1).isChecked() == true) calendar_invite = calendar_invite + 1;
      if (list_old.getRange(i+1, unterview_accessed_col+1).isChecked() == true) canvas_unterview_accessed = canvas_unterview_accessed + 1;
      if (data_old[i][commitment_quiz_col] == '3') completed_unterview = completed_unterview + 1;
      if (list_old.getRange(i+1, accelerate_101_invite_col+1).isChecked() == true) accelerate_101_invited = accelerate_101_invited + 1;
      if (list_old.getRange(i+1, accelerate_101_accessed_col+1).isChecked() == true) accelerate_101_accessed = accelerate_101_accessed + 1;
      if (list_old.getRange(i+1, attended_unterview_col+1).isChecked() == true) attended_unterview = attended_unterview + 1;
      if (list_old.getRange(i+1, catalog_enrolled_col+1).isChecked() == true) catalog_enrolled = catalog_enrolled + 1;
    }
    ***/
  
    var summary_sheet = ss.getSheetByName('Recruitment Summary');
    var summary = summary_sheet.getDataRange().getValues();
  
    var summary_lenth = summary[0].length + 1;
    var today = new Date();
    summary_sheet.getRange(1,summary_lenth).setValue(today.toDateString());
    summary_sheet.getRange(2,summary_lenth).setValue(applications);
    summary_sheet.getRange(3,summary_lenth).setValue(canvas_unterview);
    summary_sheet.getRange(4,summary_lenth).setValue(emailed);
    summary_sheet.getRange(5,summary_lenth).setValue(calendar_invite);
    summary_sheet.getRange(6,summary_lenth).setValue(canvas_unterview_accessed);
    summary_sheet.getRange(7,summary_lenth).setValue(completed_unterview);
    summary_sheet.getRange(8,summary_lenth).setValue(accelerate_101_invited);
    summary_sheet.getRange(9,summary_lenth).setValue(accelerate_101_accessed);
    summary_sheet.getRange(10,summary_lenth).setValue(attended_unterview);
    summary_sheet.getRange(11,summary_lenth).setValue(catalog_enrolled);
  
    institutionsList();
    calculateDemoBreakdown();
}

function institutionsList() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var inst = ss.getSheetByName('Institutions');
    var type_data = ss.getSheetByName('Institutions Type').getDataRange().getValues();
    var institutions = [], number = [], types = [];
    var canvas_unterview = [];
    var emailed = [];
    var calendar_invite = [];
    var canvas_unterview_accessed = [];
    var completed_unterview = [];
    var accelerate_101_invited = [];
    var accelerate_101_accessed = [];
    var attended_unterview = [];
    
    inst.clear({ formatOnly: false, contentsOnly: true });
  
    var source = ['Form Responses 1'];
  
    for (var src_index = 0; src_index < source.length; src_index++) {
      var src = source[src_index];
      var list = ss.getSheetByName(src);
      Logger.log('Opening ... ' + src);
  
      var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
      var inst_col = data[0].indexOf('What is the name of the institution you currently attend?');
      var canvas_unterview_col = data[0].indexOf('Unterview Canvas Added');
      var emailed_col = data[0].indexOf('Sent Email Ack');
      var calendar_invite_col = data[0].indexOf('Calendar Invite for Unterview');
      var unterview_accessed_col = data[0].indexOf('Unterview Canvas Accessed');
      var commitment_quiz_col = data[0].indexOf('Commitment Quiz Score');
      var accelerate_101_invite_col = data[0].indexOf('Accelerate 101 Canvas Invite');
      var accelerate_101_accessed_col = data[0].indexOf('Accelerate 101 Canvas Signup');
      var attended_unterview_col = data[0].indexOf('Unterview Attended');  
  
      for (var i = 1; i < data.length; i++) {
        if (data[i][commitment_quiz_col] == '') continue;
        var institution = data[i][inst_col].toLocaleString();
        var found = false;
        for (var j = 0; j < institutions.length; j++) {
          if (institution.replace(" ", "").toLocaleLowerCase() == institutions[j].toLocaleLowerCase().replace(" ","")) {
            found = true;
            number[j] = number[j]+1;
  
            if (list.getRange(i+1, canvas_unterview_col+1).isChecked() == true) canvas_unterview[j] = canvas_unterview[j] + 1;
            if (list.getRange(i+1, emailed_col+1).isChecked() == true) emailed[j] = emailed[j] + 1;
            if (list.getRange(i+1, calendar_invite_col+1).isChecked() == true) calendar_invite[j] = calendar_invite[j] + 1;
            if (list.getRange(i+1, unterview_accessed_col+1).isChecked() == true) canvas_unterview_accessed[j] = canvas_unterview_accessed[j] + 1;
            if (data[i][commitment_quiz_col] == '3') completed_unterview[j] = completed_unterview[j] + 1;
            if (list.getRange(i+1, accelerate_101_invite_col+1).isChecked() == true) accelerate_101_invited[j] = accelerate_101_invited[j] + 1;
            if ((data[i][commitment_quiz_col] != '3') && (list.getRange(i+1, accelerate_101_invite_col+1).isChecked() == true)) Logger.log(data[i][2] + " Got into 101 without completed Unterview?");
            if (list.getRange(i+1, accelerate_101_accessed_col+1).isChecked() == true) accelerate_101_accessed[j] = accelerate_101_accessed[j] + 1;
            if (list.getRange(i+1, attended_unterview_col+1).isChecked() == true) attended_unterview[j] = attended_unterview[j] + 1;
    
            break;
          }
        }
  
        if (found == false) {
          institutions.push(institution);
          var type_found = false;
          for (var ty = 1; ty < type_data.length; ty++) {
            if (type_data[ty][0].replace(" ", "").toLocaleLowerCase() == institution.replace(" ", "").toLocaleLowerCase()) {
              types.push(type_data[ty][1]);
              type_found = true;
              break;
            }
          }
          if (type_found == false) {
            types.push('Not Sure');
          }
          number.push(1);
  
            if (list.getRange(i+1, canvas_unterview_col+1).isChecked() == true) canvas_unterview.push(1); else canvas_unterview.push(0);
            if (list.getRange(i+1, emailed_col+1).isChecked() == true) emailed.push(1); else emailed.push(0);
            if (list.getRange(i+1, calendar_invite_col+1).isChecked() == true) calendar_invite.push(1); else calendar_invite.push(0);
            if (list.getRange(i+1, unterview_accessed_col+1).isChecked() == true) canvas_unterview_accessed.push(1); else canvas_unterview_accessed.push(0);
            if (data[i][commitment_quiz_col] == '3') completed_unterview.push(1); else completed_unterview.push(0);
            if (list.getRange(i+1, accelerate_101_invite_col+1).isChecked() == true) accelerate_101_invited.push(1); else accelerate_101_invited.push(0);
            if (list.getRange(i+1, accelerate_101_accessed_col+1).isChecked() == true) accelerate_101_accessed.push(1); else accelerate_101_accessed.push(0);
            if (list.getRange(i+1, attended_unterview_col+1).isChecked() == true) attended_unterview.push(1); else attended_unterview.push(0);
  
          Logger.log(institution + " in row " + i);
        }
      }
    }
  
    inst.appendRow(['Institution','Number of Applications','Canvas Unterview Sent', 'Emailed', 'Calendar Invite Sent', 'Canvas Unterview Accessed', 'Unterview Completed', 'Accelerate 101 Invited', 'Accelerate 101 Accessed', 'Attended Unterview Session', 'Type']   );
    for (var i = 0; i < institutions.length; i++) {
      inst.appendRow([institutions[i], number[i],canvas_unterview[i], emailed[i],calendar_invite[i], canvas_unterview_accessed[i], completed_unterview[i], accelerate_101_invited[i], accelerate_101_accessed[i], attended_unterview[i], types[i] ]);
    }
    inst.sort(2, false);
    
}

function calculateDemoBreakdown() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 1');
  
    var data = list.getDataRange().getValues();  
    var fg_col = data[0].indexOf('Would you consider yourself a first-generation college student?');
    var gender_col = data[0].indexOf('What term best describes your gender identity?');
    var urm_col = data[0].indexOf('With which race and/or ethnic group(s) do you most closely identify? [Select all that apply.]');
    var course_col = data[0].indexOf('Course');
    Logger.log(fg_col + " " + gender_col + " " + urm_col)
    var fg_count = 0, woman_count = 0, latinx_count =0, aa_count = 0;
  
    for (var i = 1; i < data.length; i++) {
    //  if (data[i][course_col] == '') break;
      if (data[i][fg_col] == 'Yes') fg_count = fg_count + 1;
      if (data[i][gender_col] != 'Man') woman_count = woman_count + 1;
      if (data[i][urm_col].toLocaleString().includes('Hispanic')) latinx_count = latinx_count + 1;
      if (data[i][urm_col].toLocaleString().includes('African')) aa_count = aa_count + 1;
    
    }
  
    var summary_sheet = ss.getSheetByName('Recruitment Summary');
    Logger.log(fg_count + " " + woman_count + " " + latinx_count + " " + aa_count );
    summary_sheet.getRange(16,2).setValue(fg_count);
    summary_sheet.getRange(17,2).setValue(woman_count);
    summary_sheet.getRange(18,2).setValue(latinx_count);
    summary_sheet.getRange(19,2).setValue(aa_count);
  
  
  
}