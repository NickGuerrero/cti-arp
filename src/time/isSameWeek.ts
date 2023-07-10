var isSameWeek = function (dateA, dateB) {
    var newDateA = new Date (dateA).setHours(0,0,0,0);
    var newDateB = new Date (dateB).setHours(0,0,0,0);
  
    return getWeek(new Date(newDateA)) === getWeek(new Date(newDateB));
};