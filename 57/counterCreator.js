var app = app || {};

(function () {
    'use strict';

    var amountOfCreations = 0;
    
    app.counterCreator = function () {
        
        amountOfCreations++;

        console.log("amountOfCreations:", amountOfCreations);

        let count = 0;

        return {
            increment: function () {
                count++;
            },
            getCurrentCount: function () {
                return count;
            }
        };       
    };
}());
