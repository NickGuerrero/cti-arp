var getWeek = function (date) {
    var janFirst = new Date(date.getFullYear(), 0, 1);
    // Source: https://stackoverflow.com/a/27125580/3307678
    return Math.ceil((((date.getTime() - janFirst.getTime()) / 86400000) + janFirst.getDay() + 1) / 7);
  };
  var isSameWeek = function (dateA, dateB) {
    var newDateA = new Date (dateA).setHours(0,0,0,0);
    var newDateB = new Date (dateB).setHours(0,0,0,0);
    console.log("newDateA: ", newDateA);
    console.log("newDateB: ", newDateB);
  
    console.log(getWeek(new Date(dateA)) === getWeek(new Date(dateB)))
    return getWeek(new Date(newDateA)) === getWeek(new Date(newDateB));
  };
  