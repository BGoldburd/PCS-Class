var app = (function (theModule) {
    'use strict';

    var amountOfCreations = 0;
    
    theModule.counterCreator = function () {
        
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

    return theModule;
}(app || {}));
