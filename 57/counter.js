var app = app || {};

app.counter = (function (theModule) {
    'use strict';

    let count = 0;

    theModule.increment = function () {
        count++;
    };

    theModule.getCurrentCount = function () {
        return count;
    };

    return theModule;
}(app.counter || {}));