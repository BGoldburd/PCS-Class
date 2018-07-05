var app = (function (theModule) {
    'use strict';

    let count = 0;

    theModule.counter = {
        increment: function () {
            count++;
        },
        getCurrentCount: function () {
            return count;
        }
    };

    return theModule;
}(app || {}));