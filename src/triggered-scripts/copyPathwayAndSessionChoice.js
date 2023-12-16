function copyPathwayAndSessionChoice() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var out_sheet = ss.getSheetByName('Master Roster');
    var out_data = out_sheet.getDataRange().getValues();
  
    var choice_sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/10KMtI0gmKnhBMQOUo3KSFimYWMYJWIHPQoWLOLbnRfw/edit?resourcekey#gid=1757215082').getSheetByName('Form Responses 1');
    var choice_data = choice_sheet.getDataRange().getValues(); 
    var c_alt_email_col = choice_data[0].indexOf('Email Address');
    var c_email_col = choice_data[0].indexOf('What email address do you use on Canvas? ');
    var c_path_col = choice_data[0].indexOf("Which Accelerate Pathway you'd like to commit to during your participation with Accelerate 2023-2024. ");
    var c_part_col = choice_data[0].indexOf('Which option are you going to commit to?');
  
  
    var found_col = choice_data[0].indexOf('Found');
  
    var first_col = out_data[0].indexOf('First Name'); 
    var last_col = out_data[0].indexOf('Last Name'); 
    var email_col = out_data[0].indexOf('Email Address'); 
    var alt_col = out_data[0].indexOf('Alternate Email')
    var path_col = out_data[0].indexOf('Chosen Pathway');
    var part_col = out_data[0].indexOf('Chosen Participation');
  
    for (var i = 1; i < choice_data.length; i++) {
      var email = choice_data[i][c_email_col].toLocaleString().toLowerCase();
      var email_alt = choice_data[i][c_alt_email_col].toLocaleString().toLocaleLowerCase();
      if (email == '') continue;
      Logger.log ('Looking for ' + out_email);
    
      for (var j = 1; j < out_data.length; j++) {
        var out_email = out_data[j][email_col].toLocaleString().toLowerCase();
        if (out_email == '') continue;
        var out_alt = out_data[j][alt_col].toLocaleString().toLowerCase();
  
        if ((email == out_email) || (out_alt.includes(email))|| (email_alt == out_email) || (out_alt.includes(email_alt)))
        {
          Logger.log ('Found' + out_email + 'at row ' + j);
          out_sheet.getRange(j+1, path_col+1).setValue(choice_data[i][c_path_col]);
          out_sheet.getRange(j+1, part_col+1).setValue(choice_data[i][c_part_col]);
          choice_sheet.getRange(i+1, found_col+1).setValue('YES');
          break;
        }
      }
    }
  }