function getEnrollmentBySection(section_id) {
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
      `https://cti-courses.instructure.com/api/v1/sections/${section_id}/enrollments?type[]=StudentEnrollment&per_page=100&`,
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

// Compiled using becs-canvas-gradebook 1.0.0 (TypeScript 4.9.5)
function getColorCode(score) {
    if (score >= 80) {
        return 'Green';
    }
    else if (score >= 70 && score < 80) {
        return 'Yellow';
    }
    else if (score >= 50 && score < 70) {
        return 'Orange';
    }
    else {
        return 'Red';
    }
}

function getUserIds(course_id) {
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
