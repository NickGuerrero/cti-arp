function getUserProgress(course_id: number, user_id: number) {
  var token = getCanvasApiKey();
  var base_url = getCanvasBaseDomain();
  var full_url = base_url + `/courses/${course_id}/users/${user_id}/progress`;
  var options = {
    muteHttpExceptions: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "GSheet Canvas API",
    },
  };

  var response = UrlFetchApp.fetch(full_url, options);
  var json = JSON.parse(response.getContentText());

  return json;
}
