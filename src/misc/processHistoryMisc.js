function removeDuplicatesInHistory() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var worksheet = ss.getSheetByName('Master Roster');
    var worksheet_data = worksheet.getDataRange().getValues();
  
    var pathway_status_history_index = worksheet_data[0].indexOf('Pathway Status History');
    var history_index = worksheet_data[0].indexOf('History')
    var guided_session_history_index = worksheet_data[0].indexOf('Guided Session History')
    var deep_work_session_history_index = worksheet_data[0].indexOf('Deep Work Session History')
  
  
    for(var i = 1; i < worksheet_data.length; i++) {
       var new_pathway_history_data = Array.from(new Set(worksheet_data[i][pathway_status_history_index].split(','))).toString()
       worksheet.getRange(i + 1, pathway_status_history_index + 1).setValue(new_pathway_history_data)
    }
  
    for(var i = 1; i < worksheet_data.length; i++) {
      var new_history_data = Array.from(new Set(worksheet_data[i][history_index].split(','))).toString()
      worksheet.getRange(i + 1, history_index + 1).setValue(new_history_data)
  
    }
  
    for(var i = 1; i < worksheet_data.length; i++) {
       if(worksheet_data[i][guided_session_history_index] == '') {
        continue;
       }
       var guided_session_history_data_remove = worksheet_data[i][guided_session_history_index].replaceAll('>;', '>,')
       var guided_session_history_data_split = guided_session_history_data_remove.split('>,').map(function(ele) {
            return ele + ">";
        })
       var new_guided_session_history_data = Array.from(new Set(guided_session_history_data_split))
  
      if(new_guided_session_history_data[new_guided_session_history_data.length - 1] == '\n>' || new_guided_session_history_data[new_guided_session_history_data.length - 1] == '>' ) {
        new_guided_session_history_data.pop()
        new_guided_session_history_data.toString()
        new_guided_session_history_data = new_guided_session_history_data + ',\n';
       }
       
      worksheet.getRange(i + 1, guided_session_history_index + 1).setValue(new_guided_session_history_data.toString())
    }
  
     for(var i = 1; i < worksheet_data.length; i++) {
      if(worksheet_data[i][deep_work_session_history_index] == '') {
        continue;
      }
      var deep_work_session_history_remove = worksheet_data[i][deep_work_session_history_index].replaceAll('>;', '>,')
      var deep_work_session_history_split = deep_work_session_history_remove.split('>,').map(function(ele) {
            return ele + ">";
      })
      var new_deep_work_session_history = Array.from(new Set(deep_work_session_history_split))
  
      if(new_deep_work_session_history[new_deep_work_session_history.length - 1] == '\n>' || new_deep_work_session_history[new_deep_work_session_history.length - 1] == '>') {
        new_deep_work_session_history.pop()
        new_deep_work_session_history.toString()
        new_deep_work_session_history = new_deep_work_session_history + ',\n';
       }
  
      worksheet.getRange(i + 1, deep_work_session_history_index + 1).setValue(new_deep_work_session_history.toString())
    }
}

function getStringFromHistory(his, num, delim){
    var ret_val = "";
    for (k = num; ; k++) {
      if (his[k] == delim) {
        return ret_val;
      } else {
        ret_val = ret_val + his[k];
      }
    }
  }
  function processHistory() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var worksheet = ss.getSheetByName('Master Roster');
    var worksheet_data = worksheet.getDataRange().getValues();
  
    var pathway_status_history_index = worksheet_data[0].indexOf('Pathway Status History');
    var history_index = worksheet_data[0].indexOf('History');
    var guided_session_history_index = worksheet_data[0].indexOf('Guided Session History');
    var deep_work_session_history_index = worksheet_data[0].indexOf('Deep Work Session History');
    var chosen_pathway_col = worksheet_data[0].indexOf('Chosen Pathway');
    var history_prog_col = worksheet_data[0].indexOf('History Progress Score');
  
    var weight = 0.2;
  
    for (var i=1; i < worksheet_data.length; i++) {
      var history = worksheet_data[i][history_index];
  
  
      var progress_metric = 100;
  
      Logger.log(history);
      var prev_course = getStringFromHistory(history,18, ':');
      var prev_milestone = getStringFromHistory(history, 23, '>');
      Logger.log(prev_course + " " + prev_milestone)
      Logger.log(history.length);
      var j = 37;
      while (true) {
        var course = getStringFromHistory(history, j+18, ':');
        var milestone = getStringFromHistory(history,j+23, '>');
        Logger.log(course + " " + milestone + " " + j);
        
        /*
        milestone_difference = milestoneDifference(course, milestone, prev_course, prev_course);
        min_milestones = getMinimumMilestone(worksheet_data[i][chosen_pathway_col]);
        console.log("minimum milestone: ", min_milestones);
              
        var weekly_progress_score = ((milestone_difference / min_milestones) * 100);
        console.log("weekly progress score: ", weekly_progress_score);
        console.log("**********************************************")
  
        progress_metric = progress_metric * (1-weight) + weekly_progress_score * weight;
  
        worksheet.getRange(i+1, history_prog_col+1).setValue(progress_metric);
        */
        j = j + 37;
        if (history.length - j < 37) break;
      }
      //worksheet.getRange(i+1, history_prog_col+1).setValue(progress_metric);
      break;
    }
}  