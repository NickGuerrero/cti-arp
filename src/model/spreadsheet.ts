class Spreadsheet
{
    constructor()
    {
        this.data = [['Student', 'ID', 'SIS User ID', 'SIS Login ID', 'Section'],
        ['Points Possible', '', '', '', '']];
    }

    addColumn(assignment)
    {
        this.data[0].push("".concat(assignment['name'], "  (").concat(assignment['id'], ")"));
        this.data[1].push(assignment['points_possible']);
    }

    addRow(student, courseSection)
    {
            var _this = this;
            
            if (student['scores']) {
                this.data.push([student.name, student['user_id'], student['sis_user_id'], student['login_id'], courseSection]);
                var student_index = this.data.length - 1;
                this.current_points = 0.0;
                student['scores'].forEach(function (score) {
                    if (score == null) {
                        _this.current_points = _this.current_points + 0;
                    }
                    else {
                        _this.current_points = _this.current_points + parseFloat(score);
                    }
                    _this.data[student_index].push(score);
                });

              this.data[student_index].push(_this.current_points);
              this.data[student_index].push(student['grades']['current_score']);
              this.data[student_index].push(student['grades']['unposted_current_score']);
              this.data[student_index].push(student['grades']['final_score']);
              this.data[student_index].push(student['grades']['unposted_final_score']);
            }
            else {
                console.log("No scores");
                console.log(student);
                return;
            }
    }

   addpoints() {
      this.data[0].push('Final Points');
      this.data[0].push('Current Score');
      this.data[0].push('Unposted Current Score');
      this.data[0].push('Final Score');
      this.data[0].push('Unposted Final Score');
      this.data[1].push('(read only)');
      this.data[1].push('(read only)');
      this.data[1].push('(read only)');
      this.data[1].push('(read only)');
      this.data[1].push('(read only)');
    }

    getSpreadSheet()
    {
        return this.data
    }
}