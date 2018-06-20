'use strict';

let letters = ['a', 'B', 'c'];

function ourSome(theArray, callback) {
    for (let i = 0; i < theArray.length; i++) {
        if (callback(theArray[i])) {
            return true;
        }
    }
    return false;
}

function uppercase(letter) {
    return letter === letter.toUpperCase();
}

function lowercase(letter) {
    return letter === letter.toLowerCase();
}

console.log(ourSome(letters, uppercase));
console.log(ourSome(letters, lowercase));

console.log('built in', letters.some(uppercase));
console.log('built in', letters.some(lowercase));

//////////////////////////////////////////////

function onlyIf(theArray, test, action) {
    for (let i = 0; i < theArray.length; i++) {
        if (test(theArray[i])) {
            action(theArray[i]);
        }
    }
}

function print(letter) {
    console.log(letter);
}

onlyIf(letters, uppercase, print);
onlyIf(letters, lowercase, print);

letters.filter(uppercase).forEach(print);
letters.filter(lowercase).forEach(print);

letters.filter(function (letter) {
    return letter === letter.toLowerCase();
}).forEach(function (letter) {
    console.log(letter);
});

