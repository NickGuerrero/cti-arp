var getWeek = function (date) {
    var janFirst = new Date(date.getFullYear(), 0, 1);
    // Source: https://stackoverflow.com/a/27125580/3307678
    return Math.ceil((((date.getTime() - janFirst.getTime()) / 86400000) + janFirst.getDay() + 1) / 7);
};