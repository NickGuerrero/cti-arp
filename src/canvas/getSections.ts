/**
 * Retrieves all sections in the course.
 * @param {Number} courseId the course id.
 * https://canvas.beta.instructure.com/doc/api/sections.html
 */

function getSections(courseId: number) {
    var token = getCanvasApiKey();
    var base_url = getCanvasBaseDomain();
    var full_url = base_url + `/courses/${courseId}/sections?`;
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