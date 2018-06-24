const dayMap = (function () {
    'use strict';

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return {
        getDayName: function (number) {
            return daysOfWeek[number - 1];
        },
        getDayNumber: function (name) {
            for (let i = 0; i < daysOfWeek.length; i++) {
                if (daysOfWeek[i] === name) {
                    return i + 1;
                }
            }
            return 'No such day';
        }
    };
}());

console.log('dayMap.getDayName(3)', dayMap.getDayName(3));
console.log('dayMap.getDayNumber("Tuesday")', dayMap.getDayNumber("Tuesday"));