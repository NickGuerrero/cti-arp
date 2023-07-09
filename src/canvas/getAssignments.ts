function getAssignments(course_id) {
  var data_set = [];

  var token = getCanvasApiKey();
  var base_url = getCanvasBaseDomain();
  var options = {
    muteHttpExceptions: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "GSheet Canvas API",
    },
  };

  var full_url = base_url + `/courses/${course_id}/assignments?per_page=99`;

  var response = UrlFetchApp.fetch(full_url, options);

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