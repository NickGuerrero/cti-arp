function getCanvasGradebook(courseId, courseTitle, courseSection)
{
    var canvasGradebook = new Spreadsheet();
    var students = {};
    var studentIds = [];
    var request_student_ids = [];
    var studentSubmissions = [];
    var assignmentsId = [];
    var studentRow = [];
    var assignmentSubmissions;
    const studentsPerRequest = 10;

    var submissions;
    var courseSectionId;
    var assignments = getAssignments(courseId);
    var sections = getSections(courseId);
    var enrollments = getEnrollmentByCourse(courseId);

    sections.forEach(function(section) {
      if(section['name'] == courseSection) {
        courseSectionId = section['id'];
      }
    })

    console.log("Course title: ", courseTitle);
    console.log("Course id: ", courseId);
    console.log("Course section: ", courseSection);
    console.log("Course section id: ", courseSectionId);

    assignments.forEach(function (assignment) {
        assignmentsId.push(assignment[['id']]);
        canvasGradebook.addColumn(assignment);
    });

    canvasGradebook.addpoints();
    
    enrollments.forEach(function (enrollment) {
     
          console.log("enrollment['course_section_id']", enrollment['course_section_id'])
          console.log("course section: ", courseSectionId);
          console.log("enrollment['course_section_id'] == courseSection: ", enrollment['course_section_id'] == courseSectionId)

          if (enrollment['course_section_id'] == courseSectionId) {
            console.log("Enrollment: ", enrollment);

            var student = new Student();

            student.setName(enrollment['user']['sortable_name']);
            student.setUserId(enrollment['user']['id']);
            student.setSisUserId(enrollment['user']['sis_user_id']);
            student.setLoginId(enrollment['user']['login_id']);
            student.setSection(enrollment['course_section_id']);
            student.setGrades(enrollment['grades']);
          
            students[student['user_id']] = student;
            studentIds.push(enrollment['user']['id']);
        
          }
          
       
    });

  

    studentIds.forEach(function (student_id, student_index) {
       
        request_student_ids.push(student_id);

        if(request_student_ids.length == studentsPerRequest) {
           
            assignmentSubmissions = getGradedMultipleAssignmentSubmissions(courseId, request_student_ids);
            assignmentSubmissions.forEach(function (student_submission) {
                studentSubmissions.push(student_submission);
            });
            request_student_ids = [];
        }

        if(student_index == (studentIds.length - 1)) {
            console.log("Last batch: ", request_student_ids )
            console.log("length: ", request_student_ids.length)
            assignmentSubmissions = getGradedMultipleAssignmentSubmissions(courseId, request_student_ids);
            assignmentSubmissions.forEach(function (student_submission) {
                studentSubmissions.push(student_submission);
            });
            request_student_ids = [];
        }
        
    });
    console.log("student submission", studentSubmissions);
    studentSubmissions.forEach(function (assignmentSubmission) {
        if (students[assignmentSubmission['user_id']]) {
            var studentSubmissionScores = {};
            var student_scores = [];
            if (assignmentSubmission['submissions']) {
                console.log("Line 64: Going to process submission");
                assignmentSubmission['submissions'].forEach(function (submission) {
                    studentSubmissionScores[submission['assignment_id']] = submission['score'];
                });

                console.log("line 71: ", studentSubmissionScores);
            }
            else {
                console.log('Student has not assignment submission');
            }
            assignmentsId.forEach(function (assignment_id) {
                if (studentSubmissionScores[assignment_id]) {
                    student_scores.push(parseFloat(studentSubmissionScores[assignment_id]).toFixed(2));
                }
                else {
                    student_scores.push(null);
                }
            });
            students[assignmentSubmission['user_id']].setScores(student_scores);
        }
    });
    studentIds.forEach(function (studentId) {
        studentRow.push(students[studentId]);
    });
    studentRow.forEach(function (row) {
     
          canvasGradebook.addRow(row, courseSection);
        
    });

    return canvasGradebook.getSpreadSheet();
}

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
            if(!student['scores']) {
              console.log("no scores")
              console.log(student);
            }
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

class Student {
    constructor() {
      this.name = '';
      this.user_id;
      this.sis_user_id = '';
      this.login_id = '';
      this.section = '';
      this.submissions = '';
      this.grades = '';
      this.scores = '';
    }
  
    setName(name) {
      return this.name = name;
    }
  
    setUserId(user_id) {
      return this.user_id = user_id;
    }
  
    setSisUserId(sis_user_id) {
      return this.sis_user_id = sis_user_id;
    }
  
    setLoginId(login_id) {
      return this.login_id = login_id;
    }
  
    setSection(section) {
      return this.section = section;
    }
  
    setGrades(grades) {
      return this.grades = grades;
    }
  
    setSubmissions(submissions) {
      return this.submissions = submissions;
    }
  
    setScores(scores) {
      return this.scores = scores;
    }
}

function getAssignments(course_id) {
    var data_set = [];
  
    var token = getCanvasApiKey();
    var options = {
      muteHttpExceptions: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "GSheet Canvas API",
      },
    };
  
    var response = UrlFetchApp.fetch(
      `https://cti-courses.instructure.com/api/v1/courses/${course_id}/assignments?per_page=300`,
      options
    );
  
    if (response.getResponseCode() == 200) {
      var json = JSON.parse(response.getContentText());
  
      json.forEach((assignment) => {
        if (assignment["published"]) {
          data_set.push(assignment);
        }
      });
  
      var nextUrl = nextURL(response.getHeaders().Link);
      while (nextUrl) {
        response = UrlFetchApp.fetch(nextUrl, options);
  
        json = JSON.parse(response.getContentText());
        json.forEach((data) => {
          data_set.push(data);
        });
        nextUrl = nextURL(response.getHeaders().Link);
      }
      return data_set;
    } else {
      console.log("Error");
      console.log("status: " + response.status);
      console.log("response code: " + response.getResponseCode());
      console.log("response content: " + response.getContent());
      console.log("response content text: " + response.getContentText());
      console.log("response headers: " + response.getHeaders());
      console.log("response all headers: " + response.getAllHeaders());
      console.log("response blob: " + response.getBlob());
      return [];
    }
}

/**
 * Retrieves all sections in the course.
 * @param {Number} courseId the course id.
 * https://canvas.beta.instructure.com/doc/api/sections.html
 */

function getSections(courseId) {
    var token = getCanvasApiKey();
    var options = {
      muteHttpExceptions: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "GSheet Canvas API",
      },
    };
  
    const canvasDomain = `https://cti-courses.instructure.com/api/v1/courses/`;
  
    var response = UrlFetchApp.fetch(
      `${canvasDomain}/${courseId}/sections?`,
      options
    );
    var json = JSON.parse(response.getContentText());
  
    return json;
}

function getEnrollmentByCourse(course_id) {
    var data_set = [];
    var token = getCanvasApiKey();
    var options = {
      muteHttpExceptions: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "GSheet Canvas API",
      },
    };
    var response = UrlFetchApp.fetch(
      `https://cti-courses.instructure.com/api/v1/courses/${course_id}/enrollments?type[]=StudentEnrollment&per_page=100`,
      options
    );
  
    if (response.getResponseCode() == 200) {
      var json = JSON.parse(response.getContentText());
      json.forEach((data) => {
        data_set.push(data);
      });
  
      var nextUrl = nextURL(response.getHeaders().Link);
      while (nextUrl) {
        response = UrlFetchApp.fetch(nextUrl, options);
  
        json = JSON.parse(response.getContentText());
        json.forEach((data) => {
          data_set.push(data);
        });
        nextUrl = nextURL(response.getHeaders().Link);
      }
      return data_set;
    } else {
      console.log("Error");
      console.log("status: " + response.status);
      console.log("response code: " + response.getResponseCode());
      console.log("response content: " + response.getContent());
      console.log("response content text: " + response.getContentText());
      console.log("response headers: " + response.getHeaders());
      console.log("response all headers: " + response.getAllHeaders());
      console.log("response blob: " + response.getBlob());
      return [];
    }
}

function getGradedMultipleAssignmentSubmissions(course_id, students) {
    var token = getCanvasApiKey();
    var options = {
      method: "get",
      muteHttpExceptions: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "GSheet Canvas API",
      },
    };
    var student_url = "";
  
    students.forEach((student) => {
      student_url += "&student_ids[]=" + student;
    });
  
    var response = UrlFetchApp.fetch(
      `https://cti-courses.instructure.com/api/v1/courses/${course_id}/students/submissions?grouped=true&per_page=100${student_url}`,
      options
    );
    if (response.getResponseCode() == 200) {
      var json = JSON.parse(response.getContentText());
      return json;
    } else {
      console.log("Error");
      console.log("status: " + response.status);
      console.log("response code: " + response.getResponseCode());
      console.log("response content: " + response.getContent());
      console.log("response content text: " + response.getContentText());
      console.log("response headers: " + response.getHeaders());
      console.log("response all headers: " + response.getAllHeaders());
      console.log("response blob: " + response.getBlob());
      return [];
    }
}
