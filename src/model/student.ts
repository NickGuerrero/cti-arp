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