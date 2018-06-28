var myApp = myApp || {};

myApp.utils = (function (theModule) {
    'use strict';

    theModule.stringCaseInsensitiveEquals = function (string1, string2) {
        return  string1.toUpperCase() === string2.toUpperCase();
    };

    return theModule;
}(myApp.utils || {}));

console.log(myApp.utils.stringCaseInsensitiveEquals('apple', 'APple'));
console.log(myApp.utils.stringCaseInsensitiveEquals('apple', 'APble'));