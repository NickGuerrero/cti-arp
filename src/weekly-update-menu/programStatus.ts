function programStatus() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var roster_sheet = ss.getSheetByName('Master Roster');
    var data = roster_sheet.getDataRange().getValues();

    var progress_color_code_col = data[0].indexOf('Progress Color Code');
    var participation_color_code_col = data[0].indexOf('Participation Color Code');
    var chosen_pathway_col = data[0].indexOf('Chosen Pathway');
    var pathway_status_col = data[0].indexOf('Pathway Status');
    var student_type_col = data[0].indexOf('Student Type');
    var first_generation_col = data[0].indexOf('Would you consider yourself a first-generation college student?')
    var urm_col = data[0].indexOf('With which race and/or ethnic group(s) do you most closely identify? [Select all that apply.]')
    var gender_col = data[0].indexOf('What term best describes your gender identity?')

    var today = new Date();

    var program_status = ss.getSheetByName('Program Status');
    var students_in_negative = []


    // Add  5 section
    for(var i = 0; i < 5; i++) {
      students_in_negative.push(0)
      students_in_negative.push(0)
      students_in_negative.push(0)
    }

    var program_status_scores = [
        [today],
        [0],
        [0],
        [0],
        [0],
        [''],
        [0],
        [0],
        [0],
        [0],
        [''],
        [0],
        [0], 
        [0],
        [0],
        [''],
        [0],
        [0], 
        [0],
        [0],
        [''],
        [0],
        [0], 
        [0],
        [0]
    ]

    // Add 4 section
    for(var i = 0; i < 4; i++) {
      program_status_scores.push([''])
      program_status_scores.push([''])
      program_status_scores.push([0])
      program_status_scores.push([0])
      program_status_scores.push([0])
      program_status_scores.push([0])

      program_status_scores.push([''])
      program_status_scores.push([0])
      program_status_scores.push([0])
      program_status_scores.push([0])
      program_status_scores.push([0])

      program_status_scores.push([''])
      program_status_scores.push([0])
      program_status_scores.push([0])
      program_status_scores.push([0])
      program_status_scores.push([0])

      program_status_scores.push([''])
      program_status_scores.push([0])
      program_status_scores.push([0])
      program_status_scores.push([0])
      program_status_scores.push([0])

      program_status_scores.push([''])   
      program_status_scores.push([0])
      program_status_scores.push([0])
      program_status_scores.push([0])
      program_status_scores.push([0])
    }


    for(var i = 1; i < data.length; i++) {
        var progress_color_code = data[i][progress_color_code_col];
        var participation_color_code = data[i][participation_color_code_col];
        var chosen_pathway = data[i][chosen_pathway_col];
        var pathway_status = data[i][pathway_status_col];
        var student_type = data[i][student_type_col];   
        var first_generation = data[i][first_generation_col]
        var urm = data[i][urm_col]
        var gender = data[i][gender_col]        

        if (progress_color_code == 'Green') {
            program_status_scores[1][0] = program_status_scores[1][0] + 1;
        
            if(student_type == 'Learning Community') {
                program_status_scores[27][0] = program_status_scores[27][0] + 1;
            }
            if(first_generation == 'Yes') {
              program_status_scores[53][0] = program_status_scores[53][0] + 1;
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
              program_status_scores[79][0] = program_status_scores[79][0] + 1;
            }
            if(gender == 'Woman') {
              program_status_scores[105][0] = program_status_scores[105][0] + 1;
            }
        }
        else if (progress_color_code == 'Yellow') {
            program_status_scores[2][0] = program_status_scores[2][0] + 1;
        
            if(student_type == 'Learning Community') {
                program_status_scores[28][0] = program_status_scores[28][0] + 1;
            }
            if(first_generation == 'Yes') {
              program_status_scores[54][0] = program_status_scores[54][0] + 1;
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
              program_status_scores[80][0] = program_status_scores[80][0] + 1;
            }
            if(gender == 'Woman') {
              program_status_scores[106][0] = program_status_scores[106][0] + 1;
            }
        }
        else if (progress_color_code == 'Orange') {
            program_status_scores[3][0] = program_status_scores[3][0] + 1;
            
            if(student_type == 'Learning Community') {
                program_status_scores[29][0] = program_status_scores[29][0] + 1;
            }

            if(first_generation == 'Yes') {
              program_status_scores[55][0] = program_status_scores[55][0] + 1;
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
              program_status_scores[81][0] = program_status_scores[81][0] + 1;
            }
            if(gender == 'Woman') {
              program_status_scores[107][0] = program_status_scores[107][0] + 1;
            }
        }
        else if (progress_color_code == 'Red')  {
            program_status_scores[4][0] = program_status_scores[4][0] + 1;
            
            if(student_type == 'Learning Community')  {
                program_status_scores[30][0] = program_status_scores[30][0] + 1;
            }

            if(first_generation == 'Yes') {
              program_status_scores[56][0] = program_status_scores[56][0] + 1;
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
              program_status_scores[82][0] = program_status_scores[82][0] + 1;
            }
            if(gender == 'Woman') {
              program_status_scores[108][0] = program_status_scores[108][0] + 1;
            }
        }
        if (participation_color_code == 'Green')  {
        
            program_status_scores[6][0] = program_status_scores[6][0] + 1;
            
            if(student_type == 'Learning Community')  {
                program_status_scores[32][0] = program_status_scores[32][0] + 1;
            }

            if(first_generation == 'Yes') {
              program_status_scores[58][0] = program_status_scores[58][0] + 1;
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
              program_status_scores[84][0] = program_status_scores[84][0] + 1;
            }
            if(gender == 'Woman') {
              program_status_scores[110][0] = program_status_scores[110][0] + 1;
            }
        }
        else if(participation_color_code == 'Yellow') {

            program_status_scores[7][0] = program_status_scores[7][0] + 1;
            
            if(student_type == 'Learning Community')  {
                program_status_scores[33][0] = program_status_scores[33][0] + 1;
            }

            if(first_generation == 'Yes') {
              program_status_scores[59][0] = program_status_scores[59][0] + 1;
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
              program_status_scores[85][0] = program_status_scores[85][0] + 1;
            }
            if(gender == 'Woman') {
              program_status_scores[111][0] = program_status_scores[111][0] + 1;
            }
        }
        else if(participation_color_code == 'Orange') {
            
            program_status_scores[8][0] = program_status_scores[8][0] + 1;
            
            if(student_type == 'Learning Community')  {
                program_status_scores[34][0] = program_status_scores[34][0] + 1;
            }

            if(first_generation == 'Yes') {
              program_status_scores[60][0] = program_status_scores[60][0] + 1;
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
              program_status_scores[86][0] = program_status_scores[86][0] + 1;
            }
            if(gender == 'Woman') {
              program_status_scores[112][0] = program_status_scores[112][0] + 1;
            }

        }
        else if(participation_color_code == 'Red')  {

            program_status_scores[9][0] = program_status_scores[9][0] + 1;
            
            if(student_type == 'Learning Community')  {
                program_status_scores[35][0] = program_status_scores[35][0] + 1;
            }

            if(first_generation == 'Yes') {
              program_status_scores[61][0] = program_status_scores[61][0] + 1;
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
              program_status_scores[87][0] = program_status_scores[87][0] + 1;
            }
            if(gender == 'Woman') {
              program_status_scores[113][0] = program_status_scores[113][0] + 1;
            }
        }


        if (chosen_pathway == 'I. Open-Source & REU') {
            if(pathway_status >= 0) {

                
                program_status_scores[11][0] = program_status_scores[11][0] + 1;
                program_status_scores[13][0] = program_status_scores[13][0] + pathway_status;
                   
                if(student_type == 'Learning Community')  {
                    program_status_scores[37][0] = program_status_scores[37][0] + 1;
                    program_status_scores[39][0] = program_status_scores[39][0] + pathway_status;
                }   

                if(first_generation == 'Yes') {
                  program_status_scores[63][0] = program_status_scores[63][0] + 1;
                  program_status_scores[65][0] = program_status_scores[65][0] + pathway_status;
                }
                if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
                  program_status_scores[89][0] = program_status_scores[89][0] + 1;
                  program_status_scores[91][0] = program_status_scores[91][0] + pathway_status;
                }
                if(gender == 'Woman') {
                  program_status_scores[115][0] = program_status_scores[115][0] + 1;
                  program_status_scores[117][0] = program_status_scores[117][0] + pathway_status;
                }
            }
            else {
                students_in_negative[0] = students_in_negative[0] + 1;
                program_status_scores[14][0] = eval(program_status_scores[14][0] + pathway_status);

                if(student_type == 'Learning Community')  {
                  students_in_negative[3] = students_in_negative[3] + 1;
                  program_status_scores[40][0] = eval(program_status_scores[40][0] + pathway_status);
                } 

                if(first_generation == 'Yes') {
                  students_in_negative[6] = students_in_negative[6] + 1;
                  program_status_scores[66][0] = eval(program_status_scores[66][0] + pathway_status);
                }

                if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
                  students_in_negative[9] = students_in_negative[9] + 1;
                  program_status_scores[92][0] = program_status_scores[92][0] + pathway_status;
                }
                if(gender == 'Woman') {
                  students_in_negative[12] = students_in_negative[12] + 1;
                  program_status_scores[118][0] = program_status_scores[118][0] + pathway_status;
                }
            }

            
            program_status_scores[12][0] = program_status_scores[12][0] + 1;
            
            if(student_type == 'Learning Community')  {
                program_status_scores[38][0] = program_status_scores[38][0] + 1;
            }
            if(first_generation == 'Yes') {
                  program_status_scores[64][0] = eval(program_status_scores[64][0] + 1);
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
                  program_status_scores[90][0] = program_status_scores[90][0] + 1;
            }
            
            if(gender == 'Woman') {
                  program_status_scores[116][0] = program_status_scores[116][0] + 1;
            }
        }
        else if (chosen_pathway == 'II. Spring Tech Internship') {
            if(pathway_status >= 0) {
    
                program_status_scores[16][0] = program_status_scores[16][0] + 1;
                program_status_scores[18][0] = program_status_scores[18][0] + pathway_status;
                
                if(student_type == 'Learning Community')  {
                    program_status_scores[42][0] = program_status_scores[42][0] + 1;
                    program_status_scores[44][0] = program_status_scores[44][0] + pathway_status;

                }

                if(first_generation == 'Yes') {
                  program_status_scores[68][0] = eval(program_status_scores[68][0] + 1);
                  program_status_scores[70][0] = program_status_scores[70][0] + pathway_status;

                }
                if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
                  program_status_scores[94][0] = program_status_scores[94][0] + 1;
                  program_status_scores[96][0] = program_status_scores[96][0] + pathway_status;
                }

                if(gender == 'Woman') {
                  program_status_scores[120][0] = program_status_scores[120][0] + 1;
                  program_status_scores[122][0] = program_status_scores[122][0] + pathway_status;

                }

            } else {
                students_in_negative[1] = students_in_negative[1] + 1;
                program_status_scores[19][0] = eval(program_status_scores[19][0] + pathway_status);
                if(student_type == 'Learning Community')  {
                  students_in_negative[4] = students_in_negative[4] + 1;
                  program_status_scores[45][0] = eval(program_status_scores[45][0] + pathway_status);
                } 
                if(first_generation == 'Yes') {
                  students_in_negative[7] = students_in_negative[7] + 1;
                  program_status_scores[71][0] = program_status_scores[71][0] + pathway_status;

                }
                if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
                  students_in_negative[10] = students_in_negative[10] + 1;
                  program_status_scores[97][0] = program_status_scores[97][0] + pathway_status;
                }
                if(gender == 'Woman') {
                  students_in_negative[13] = students_in_negative[13] + 1;
                  program_status_scores[123][0] = program_status_scores[123][0] + pathway_status;
                }
                
            }

            
            program_status_scores[17][0] = program_status_scores[17][0] + 1;
            
            if(student_type == 'Learning Community')  {
                program_status_scores[43][0] = program_status_scores[43][0] + 1;
            }
            if(first_generation == 'Yes') {
                  program_status_scores[69][0] = program_status_scores[69][0] + 1
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
                  program_status_scores[95][0] = program_status_scores[95][0] + 1;
            }
            if(gender == 'Woman') {
                  program_status_scores[121][0] = program_status_scores[121][0] + 1;
            }
            
        }
        else if (chosen_pathway == 'III. Fall Tech Internship') {
            if(pathway_status >= 0)  {
                
                program_status_scores[21][0] = program_status_scores[21][0] + 1;
                program_status_scores[23][0] = program_status_scores[23][0] + pathway_status;

                
                if(student_type == 'Learning Community')  {
                    program_status_scores[47][0] = program_status_scores[47][0] + 1;
                    program_status_scores[49][0] = program_status_scores[49][0] + pathway_status;

                }
                if(first_generation == 'Yes') {
                  program_status_scores[73][0] = program_status_scores[73][0] + 1
                  program_status_scores[75][0] = program_status_scores[75][0] + pathway_status;
                } 
                if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
                  program_status_scores[99][0] = program_status_scores[99][0] + 1;
                  program_status_scores[101][0] = program_status_scores[101][0] + pathway_status;
                }

                if(gender == 'Woman') {
                  program_status_scores[125][0] = program_status_scores[125][0] + 1;
                  program_status_scores[127][0] = program_status_scores[127][0] + pathway_status;

                }
            }
            else {
                students_in_negative[2] = students_in_negative[2] + 1;
                program_status_scores[24][0] = eval(program_status_scores[24][0] + pathway_status);
                if(student_type == 'Learning Community')  {
                  students_in_negative[5] = students_in_negative[5] + 1;
                  program_status_scores[50][0] = eval(program_status_scores[50][0] + pathway_status);
                }
                if(first_generation == 'Yes') {
                  students_in_negative[8] = students_in_negative[8] + 1;
                  program_status_scores[76][0] = program_status_scores[76][0] + pathway_status;
                }
                if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
                  students_in_negative[11] = students_in_negative[11] + 1;
                  program_status_scores[102][0] = program_status_scores[102][0] + pathway_status;
                }

                if(gender == 'Woman') {
                  students_in_negative[14] = students_in_negative[14] + 1;
                  program_status_scores[128][0] = program_status_scores[128][0] + pathway_status;
                }

            }
            
            program_status_scores[22][0] = program_status_scores[22][0] + 1;
            
            if(student_type == 'Learning Community')  {
                program_status_scores[48][0] = program_status_scores[48][0] + 1;
            }

            if(first_generation == 'Yes') {
                  program_status_scores[74][0] = program_status_scores[74][0] + 1
            }
            if(urm == 'Black or African American' || urm == 'Hispanic or Latinx') {
                  program_status_scores[100][0] = program_status_scores[100][0] + 1;
            }
            if(gender == 'Woman') {
                  program_status_scores[126][0] = program_status_scores[126][0] + 1;
            }
            
        }
    }

    for(var i = 12; i < program_status_scores.length; i = i + 26) {
      program_status_scores[i][0] = ((program_status_scores[i - 1][0] / program_status_scores[i][0]) * 100).toFixed(1)+ '%';
      program_status_scores[i + 1][0] = (program_status_scores[i + 1][0] / program_status_scores[i - 1][0]).toFixed(2);

      program_status_scores[i + 5][0] = ((program_status_scores[i + 4][0] / program_status_scores[i + 5][0]) * 100).toFixed(1)+ '%';
      program_status_scores[i + 6][0] = (program_status_scores[i + 6][0] / program_status_scores[i + 4][0]).toFixed(2);

      program_status_scores[i + 10][0] = ((program_status_scores[i + 9][0] / program_status_scores[i + 10][0]) * 100).toFixed(1)+ '%';
      program_status_scores[i + 11][0] = (program_status_scores[i + 11][0] / program_status_scores[i + 9][0]).toFixed(2);
    }

  

    program_status_scores[14][0] = (program_status_scores[14][0] / students_in_negative[0]).toFixed(2);
    program_status_scores[19][0] = (program_status_scores[19][0] / students_in_negative[1]).toFixed(2);
    program_status_scores[24][0] = (program_status_scores[24][0] /students_in_negative[2]).toFixed(2);

// Learning Communities

    program_status_scores[40][0] = (program_status_scores[40][0] /students_in_negative[3]).toFixed(2);
    program_status_scores[45][0] = (program_status_scores[45][0] /students_in_negative[4]).toFixed(2);
    program_status_scores[50][0] = (program_status_scores[50][0] /students_in_negative[5]).toFixed(2);

  // First Generation

    program_status_scores[66][0] = (program_status_scores[66][0] /students_in_negative[6]).toFixed(2);
    program_status_scores[71][0] = (program_status_scores[71][0] /students_in_negative[7]).toFixed(2);
    program_status_scores[76][0] = (program_status_scores[76][0] /students_in_negative[8]).toFixed(2);


  // URM

    program_status_scores[92][0] = (program_status_scores[92][0] /students_in_negative[9]).toFixed(2);
    program_status_scores[97][0] = (program_status_scores[97][0] /students_in_negative[10]).toFixed(2);
    program_status_scores[102][0] = (program_status_scores[102][0] /students_in_negative[11]).toFixed(2);

  // Women
    program_status_scores[118][0] = (program_status_scores[118][0] /students_in_negative[12]).toFixed(2);
    program_status_scores[123][0] = (program_status_scores[123][0] /students_in_negative[13]).toFixed(2);
    program_status_scores[128][0] = (program_status_scores[128][0] /students_in_negative[14]).toFixed(2);


    



    program_status.getRange(1, program_status.getLastColumn() + 1, program_status_scores.length, 1).setValues(program_status_scores);

    courseProgressStatusDashboard();

}

function courseProgressStatusDashboard() {
    var master = SpreadsheetApp.getActiveSpreadsheet();
    var dashboard = master.getSheetByName('Master Roster');
    var data = dashboard.getDataRange().getValues();
      var course_col = data[0].indexOf('Course');
    var milestone_col = data[0].indexOf('Milestone');
    var out_sheet = master.getSheetByName('Course Progress Status');
    var out_data = out_sheet.getDataRange().getValues();
    var out_col_len = out_data[0].length + 1;
    var today = new Date();
    out_sheet.getRange(1, out_col_len).setValue(today.toDateString());
    
  
    var course_count_map = new Map();
    course_count_map.set('101', 0);
    course_count_map.set('201', 0);
    course_count_map.set('202', 0);
    course_count_map.set('301', 0);
    course_count_map.set('302', 0);
  
    var milestones101_map = new Map();
    // ROWS 10 to 21 in the Program Status tab keep track of 101 progress
    for (var i = 9; i <= 20; i++) {
      milestones101_map.set(out_data[i][0].toLocaleString(), 0);
    }
  
    var milestones201_map = new Map();
    // ROWS 24 to 35 in the Program Status tab keep track of 201 progress
    for (var i = 23; i <= 34; i++) {
      milestones201_map.set(out_data[i][0].toLocaleString(), 0);
    }  
  
    var milestones202_map = new Map();
    // ROWS 38 to 49 in the Program Status tab keep track of 201 progress
    for (var i = 37; i <= 48; i++) {
      milestones202_map.set(out_data[i][0].toLocaleString(), 0);
    }  
    
    for (var i = 1; i < data.length; i++) {
      if (data[i][course_col] == '') continue;
      var count = course_count_map.get(data[i][course_col].toLocaleString());
      Logger.log(data[i][course_col] + ' = ' + count);
      course_count_map.set(data[i][course_col].toLocaleString(),count+1);   
      
      if (data[i][course_col] == 101) {
        count = milestones101_map.get(data[i][milestone_col].toLocaleString());
        Logger.log(data[i][milestone_col] + ' = ' + count);
        milestones101_map.set(data[i][milestone_col].toLocaleString(), count+1);
      }
  
       if (data[i][course_col] == 201) {
        count = milestones201_map.get(data[i][milestone_col].toLocaleString());
        Logger.log(data[i][milestone_col] + ' = ' + count);
        milestones201_map.set(data[i][milestone_col].toLocaleString(), count+1);
       }
  
       if (data[i][course_col] == 202) {
        count = milestones202_map.get(data[i][milestone_col].toLocaleString());
        Logger.log(data[i][milestone_col] + ' = ' + count);
        milestones202_map.set(data[i][milestone_col].toLocaleString(), count+1);      
      }  
    }
  
    out_sheet.getRange(2,out_col_len).setValue(course_count_map.get('101'));
    out_sheet.getRange(3,out_col_len).setValue(course_count_map.get('201'));
    out_sheet.getRange(4,out_col_len).setValue(course_count_map.get('202'));
    out_sheet.getRange(5,out_col_len).setValue(course_count_map.get('301'));
    out_sheet.getRange(6,out_col_len).setValue(course_count_map.get('302'));
    
    // ROWS 10 to 21 in the Program Status tab keep track of 101 progress
    for (var i = 9; i <= 20; i++) {
      out_sheet.getRange(i+1,out_col_len).setValue(milestones101_map.get(out_data[i][0].toLocaleString()));
    }
  
    // ROWS 24 to 35 in the Program Status tab keep track of 201 progress
    for (var i = 23; i <= 34; i++) {
      out_sheet.getRange(i+1,out_col_len).setValue(milestones201_map.get(out_data[i][0].toLocaleString()));
    }
  
    // ROWS 38 to 49 in the Program Status tab keep track of 202 progress
    for (var i = 37; i <= 48; i++) {
      out_sheet.getRange(i+1,out_col_len).setValue(milestones202_map.get(out_data[i][0].toLocaleString()));
    }
  
    updateTargetPopulationDashboard();
}

function updateTargetPopulationDashboard() {
courseProgressForTargetPopulationDashboard (1,'FG')
courseProgressForTargetPopulationDashboard (37,'URM')
courseProgressForTargetPopulationDashboard (73,'Gender')
}

/////////////////////////
function courseProgressForTargetPopulationDashboard(row, student_demo_category) {
    var master = SpreadsheetApp.getActiveSpreadsheet();
    var dashboard = master.getSheetByName('Master Roster');
    var data = dashboard.getDataRange().getValues();
    var course_col = data[0].indexOf('Course');
    var milestone_col = data[0].indexOf('Milestone');
    var fg_col = data[0].indexOf('Would you consider yourself a first-generation college student?');
    var gender_col = data[0].indexOf('What term best describes your gender identity?');
    var urm_col = data[0].indexOf('With which race and/or ethnic group(s) do you most closely identify? [Select all that apply.]');

    var out_sheet = master.getSheetByName('Target Student Status');
    var out_data = out_sheet.getDataRange().getValues();
    var out_col_len = 0;

    if (student_demo_category == 'FG') {
        out_col_len = out_data[0].length + 1;
        var today = new Date();
        out_sheet.getRange(1, out_col_len).setValue(today.toDateString());
    } else {
        out_col_len = out_data[0].length;
    }

    var course_count_map = new Map();
    course_count_map.set('101', 0);
    course_count_map.set('201', 0);
    course_count_map.set('202', 0);
    course_count_map.set('301', 0);
    course_count_map.set('302', 0);

    var milestones101_map = new Map();
    // ROWS 10 to 21 in the Program Status tab keep track of 101 progress
    for (var i = 9; i <= 20; i++) {
        milestones101_map.set(out_data[i][0].toLocaleString(), 0);
    }

    var milestones201_map = new Map();
    // ROWS 24 to 35 in the Program Status tab keep track of 201 progress
    for (var i = 23; i <= 34; i++) {
        milestones201_map.set(out_data[i][0].toLocaleString(), 0);
    }  

    for (var i = 1; i < data.length; i++) {
        Logger.log('Looking ... ' + data[i][2] + ' FG = ' + data[i][fg_col] + ' Gender = ' + data[i][gender_col] + ' URM = ' + data[i][urm_col] + ' Course = ' + data[i][course_col]);
        if (data[i][course_col] == '') continue;
        if ((student_demo_category == 'FG') && data[i][fg_col] == 'No') continue;
        if ((student_demo_category == 'Gender') && (data[i][gender_col] == 'Man')) continue;
        if ((student_demo_category == 'URM') && ((data[i][urm_col].toLocaleString().includes('White')) ||(data[i][urm_col].toLocaleString().includes('Asian')))) continue;
        var count = course_count_map.get(data[i][course_col].toLocaleString());
        Logger.log(data[i][course_col] + ' = ' + count);
        course_count_map.set(data[i][course_col].toLocaleString(),count+1);   
        
        if (data[i][course_col] == 101) {
        count = milestones101_map.get(data[i][milestone_col].toLocaleString());
        Logger.log(data[i][milestone_col] + ' = ' + count);
        milestones101_map.set(data[i][milestone_col].toLocaleString(), count+1);
        }

        if (data[i][course_col] == 201) {
        count = milestones201_map.get(data[i][milestone_col].toLocaleString());
        Logger.log(data[i][milestone_col] + ' = ' + count);
        milestones201_map.set(data[i][milestone_col].toLocaleString(), count+1);
        }  
    }

    out_sheet.getRange(row+1,out_col_len).setValue(course_count_map.get('101'));
    out_sheet.getRange(row+2,out_col_len).setValue(course_count_map.get('201'));
    out_sheet.getRange(row+3,out_col_len).setValue(course_count_map.get('202'));
    out_sheet.getRange(row+4,out_col_len).setValue(course_count_map.get('301'));
    out_sheet.getRange(row+5,out_col_len).setValue(course_count_map.get('302'));

    // ROWS 10 to 21 in the Program Status tab keep track of 101 progress
    for (var i = row+8; i <= row+19; i++) {
        out_sheet.getRange(i+1,out_col_len).setValue(milestones101_map.get(out_data[i][0].toLocaleString()));
    }

    // ROWS 24 to 35 in the Program Status tab keep track of 201 progress
    for (var i = row+22; i <= row+33; i++) {
        out_sheet.getRange(i+1,out_col_len).setValue(milestones201_map.get(out_data[i][0].toLocaleString()));
    }
}