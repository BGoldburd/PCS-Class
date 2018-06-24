const interestCalc = (function () {
    'use strict';
    let intRate;
    let amtYears;

    return {
        setRate: function (rate) {
            intRate = rate;
        },
        setYears: function (years) {
            amtYears = years;
        },
        calculateInterest: function (principle) {
            return (principle * intRate) * amtYears;
        }
    };
}());

interestCalc.setRate('.06');
interestCalc.setYears(10);
console.log(interestCalc.calculateInterest(6000));

interestCalc.setRate('.05');
interestCalc.setYears(10);
console.log(interestCalc.calculateInterest(1000));
