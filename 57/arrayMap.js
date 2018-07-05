function arrayMap(theArray, callback) {
    'use strict';
    let mappedItems = [];

    for (let i = 0; i < theArray.length; i++) {
        mappedItems.push(callback(theArray[i]));
    }
    
    return mappedItems;
}

let numbers = [2,4,6];

let numbersDoubled = arrayMap(numbers, function (x) {'use strict'; return x * 2;});

console.log(numbers);
console.log(numbersDoubled);