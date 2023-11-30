function drawLinesForAGs() {
    var master = SpreadsheetApp.getActiveSpreadsheet();
    var dashboard = master.getSheetByName('Master Roster');
    var data = dashboard.getDataRange().getValues();
    var ag_col = data[0].indexOf('Accountability Group');
    var team_col = data[0].indexOf('Accountability Team');
    var col_len = data[0].length;
    var ag_count = [];
    var count = 1;
    var pods = 1;
    for (var index = 2; index < data.length; index ++ ) {
      if (data[index-1][ag_col] != data[index][ag_col]) {
        pods = pods + 1;
        ag_count.push(count);
        count = 1;
        // Set bold line below
        for (var j = 1; j < col_len+2; j++) {
          var cell = dashboard.getRange(index+1, j);
          cell.setBorder(true, null, null, null, false, false, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
        }
      } else if (data[index-1][team_col] != data[index][team_col]) {
        pods = pods + 1;
        ag_count.push(count);
        count = 1;
        // Set bold line below
        for (var j = 1; j < col_len+2; j++) {
          var cell = dashboard.getRange(index+1, j);
          cell.setBorder(true, null, null, null, false, false, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
        }
  
      } else
        {
        count = count + 1;
        for (var j = 1; j < col_len+2; j++) {
          var cell = dashboard.getRange(index+1, j);
          cell.setBorder(false, null, false, null, null, null);
        }
      }
    }
  
  /*
    var ag_summary_sheet = master.getSheetByName('AG Summary');
    ag_summary_sheet.clearContents();
    ag_summary_sheet.appendRow(['AG #', 'Count']);
    for (var i = 1; i <= ag_count.length; i++) {
      ag_summary_sheet.appendRow([i, ag_count[i-1]]);
    }
    */
    
    Logger.log('Pods = '+ pods);
}

function resetMetricScore() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var roster_sheet = ss.getSheetByName('Master Roster');
    var data = roster_sheet.getDataRange().getValues();
    var progress_col = data[0].indexOf('Last Week Progress Metric');
    var participation_col = data[0].indexOf('Last Week Participation Metric');

    for (var i = 1; i < data.length; i++) {
        if (data[i][progress_col] > 100) roster_sheet.getRange(i+1, progress_col+1).setValue(100);
        if (data[i][participation_col] > 100) roster_sheet.getRange(i+1, participation_col+1).setValue(100);
    }
    
}

/**
 * Function will use Accelerate Catalog Enrolled Tab to identify students who are in the catalog program Accelerate
 * Update column Accelerate Catalog Enrolled
 */
function processCatalogEnroll() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var catalog_sheet = ss.getSheetByName('Accelerate Catalog Enrolled');
    var catalog = catalog_sheet.getDataRange().getValues();
    var catalog_col_len = catalog[0].length;
    var source = ['Form Responses 1'];

    for (var src_index = 0; src_index < source.length; src_index++) {
        var src = source[src_index];
        var list = ss.getSheetByName(src);
        Logger.log('Opening ... ' + src);

        var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
        var catalog_enrolled_col = data[0].indexOf('Accelerate Catalog Enrolled');
        var email_col = data[0].indexOf('Email Address');
        var alt_email_col = data[0].indexOf('Alternate Email');
        var canvas_id_col = data[0].indexOf('Canvas ID');

        for (var i = 1; i < data.length; i++) {
        Logger.log('Looking for ...' + data[i][2] + " " + data[i][4]);
        for (var j = 1; j < catalog.length; j++) {
            // if ((data[i][email_col] == catalog[j][3]) || (data[i][alt_email_col] == catalog[j][3])) {
            if (data[i][canvas_id_col] == catalog[j][1]) {
            list.getRange(i+1, catalog_enrolled_col+1).setValue('TRUE');
            catalog_sheet.getRange(j+1, catalog_col_len+1).setValue('FOUND');
            Logger.log('FOUND');
            break;
            }
        }

        }
    }
}

/**
 * Function - goes through the rows and identifies students who are Internship Connection Program (ICP)
 * eligible with CodePath - sets the ICP Eligible Column
 */
function icpEligible() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 1');  
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
  
    var year_col = data[0].indexOf("What is your year/status in school?");
    var urm_col = data[0].indexOf("With which race and/or ethnic group(s) do you most closely identify? [Select all that apply.]");
    var gender_col = data[0].indexOf('What term best describes your gender identity?');
    var icp_col = data[0].indexOf('ICP Eligible');
    var course_col = data[0].indexOf('Course');
    var inst_col = data[0].indexOf('What is the name of the institution you currently attend?')
  
    for (var i = 1; i < data.length; i++) {
      if (((data[i][year_col] == 'Second Year') || (data[i][inst_col] == 'CSin3 Cohort at CSUMB')) &&((data[i][course_col] == '201')||(data[i][course_col] == '202')||(data[i][course_col] == '301'))&& ((data[i][urm_col] != 'Asian') && (data[i][urm_col] != 'White'))) {
        list.getRange(i+1, icp_col+1).setValue('TRUE');
      }
    }
}

/**
 * Function to create pre-assigned breakout rooms
 */
function updateZoomBreakoutRooms() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var zoomemails = ss.getSheetByName('Breakout Rooms');
    var list = ss.getSheetByName('Master Roster');
    var master_data = list.getDataRange().getValues();
    var room_count = 0;
  
    var group_col = master_data[0].indexOf('Accountability Group');
    var team_col = master_data[0].indexOf('Accountability Team');
    var email_col = master_data[0].indexOf('Email Address');
  
    zoomemails.clear({ formatOnly: false, contentsOnly: true });
    zoomemails.appendRow(["Pre-assign Room Name", "Email Address"]);
  
    var previouos_group = '';
    var previous_team = '';
    for (var i = 1; i < master_data.length; i++) {
      var group = master_data[i][group_col];
      var team = master_data[i][team_col];
  
      if ((group != previouos_group) || (team != previous_team)) {
        zoomemails.appendRow([group + '-' + team, master_data[i][email_col]]);
        previouos_group = group;
        previous_team = team;
        room_count = room_count + 1;
      }
    }
  
    for (var j = room_count; j < 47; j++) {
      zoomemails.appendRow(['Extra room ' + (j-room_count+1), 'lkern@csumb.edu' ]);
    }
    zoomemails.appendRow(['Staff Office 1', 'snarayanan@csumb.edu']);
    zoomemails.appendRow(['Staff Office 2', 'snarayanan@csumb.edu']);
    zoomemails.appendRow(['Staff Office 3', 'snarayanan@csumb.edu']);
}

/**
 * Function to find all institutions with single digit applications and 
 * update the tab Single Digit Institutions with the student name and email address
 */
  
function rosterOfSingleDigitInstitutions() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = ss.getSheetByName('Form Responses 1');  
    var data = list.getRange(1,1,list.getLastRow(),list.getLastColumn()).getValues();
    var institutions_count = ss.getSheetByName('Institutions').getDataRange().getValues();
  
    var first_col = data[0].indexOf("First Name");
    var last_col = data[0].indexOf("Last Name");
    var inst_col = data[0].indexOf('What is the name of the institution you currently attend?')
  
    var email_col = data[0].indexOf("Email Address");
  
    var today = new Date();
    var output = ss.getSheetByName('Single Digit Institutions');
  
    output.appendRow(['Name',	'Email Address', 'Institution', 'Count']);
  
    for (var i = 1; i < institutions_count.length; i++) {
      Logger.log(institutions_count[i][0] + " = " + institutions_count[i][1])
      if (institutions_count[i][1] < 10) {
        var institution_name = institutions_count[i][0];
        for (var j = 1; j < data.length;j++) {
          if (data[j][inst_col] == institution_name) {
            var first = data[j][first_col];
            if (data[j][first_col+1] != '') {
              first = data[j][first_col+1];
            } 
            var last = data[j][last_col];
            var email = data[j][email_col];
            output.appendRow([first, email, institution_name,institutions_count[i][1]]);
          }
        }
      }
    } 
}

function checkCalendarInvitesAgainstRoster() {
    var master = SpreadsheetApp.getActiveSpreadsheet();
    var dashboard = master.getSheetByName('Form Responses 1');
    var data = dashboard.getDataRange().getValues();
    var email_col = data[0].indexOf('Email Address');
    var commit_col = data[0].indexOf('Commitment Quiz Score');
  
    var cal_invites_sheet = master.getSheetByName('Calendar Invites');
    var cal_invites = cal_invites_sheet.getDataRange().getValues();
  
    for (var i = 1; i < data.length; i++) {
      if (data[i][commit_col] != '') {
        var found = false;
        for (var j = 1; j < cal_invites.length; j++) {
          if (cal_invites[j][0].toLocaleString().toLocaleLowerCase().includes(data[i][email_col].toLocaleString().toLocaleLowerCase())) {
            cal_invites_sheet.getRange(j+1, 2).setValue('Sent');
            found = true;
          }
        }
        if (found == false) {
          cal_invites_sheet.appendRow([data[i][email_col],'NOT Sent']);
        }
      }
    }
}

function copySAAssignmentFromAGSummary() {
    var master = SpreadsheetApp.getActiveSpreadsheet();
    var dashboard = master.getSheetByName('Form Responses 1');
    var data = dashboard.getDataRange().getValues();
    var dash_ag_col = data[0].indexOf('Accountability Group #');
    var sa_col = data[0].indexOf('SA Name');
  
    var ag_data = master.getSheetByName('AG Summary').getDataRange().getValues();
  
    var ag_row = 1;
  
    for (var i = 1; i < data.length; i++) {
      if (data[i][dash_ag_col] == ag_data[ag_row][0]) {
        dashboard.getRange(i+1, sa_col+1).setValue(ag_data[ag_row][2]);
      } else {
        ag_row++;
        i--;
        if (ag_row == ag_data.length) break;
      }
    }  
}

/*** 
 * Function will find the emailID for the first draft message
 */
function emailID() {
    var draft = GmailApp.getDrafts()[0];
    var aliases = GmailApp.getAliases();
    Logger.log (draft.getId());
    Logger.log(aliases);
}

function convertColumnToIndex(letter) {
    var column = 0, length = letter.length;
    for (var i = 0; i < length; i++)
    {
      column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    }
    return column;
}

function compareString(s1, s2) {
    if (s1.toLocaleString().toLocaleLowerCase() == s2.toLocaleString().toLocaleLowerCase()) {
      return true;
    }
    else {
      return false;
    }
}