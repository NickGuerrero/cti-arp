function findColInGradeBook(grades_titles, title) {
  for (var i = 0; i < grades_titles.length; i++) {
    let canvas_gradebook_title = grades_titles[i].toLocaleString().replace(/\s+/g, '');  // remove all white spaces
    let milestone_title = title.toLocaleString().replace(/\s+/g, '');  // remove all white spaces

    if (canvas_gradebook_title.includes(milestone_title)) {
      return i
    }
  }
  return -1;
}