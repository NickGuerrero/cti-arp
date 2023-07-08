  function getGradedMultipleAssignmentSubmissions(course_id, students) {
    var token = getCanvasApiKey();
    var base_url = getCanvasBaseDomain();
    var full_url = base_url + `/courses/${course_id}/students/submissions?grouped=true&per_page=100${student_url}`;              
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
  
    var response = UrlFetchApp.fetch(full_url, options);

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