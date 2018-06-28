(function(){
    'use strict';


    ////////THIS FUNCTION JUST TO ADD COMMAS///////////////////////////
    const addCommas = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };
    ////////////////////////////////////////////////////////////////////


    function addInterest(amount) {
        this.balance += amount;
        console.log('Your Current Balance: $' + addCommas(this.balance));
    }

    let checkingAccount = {
        balance: 1000
    };

    let savingsAccount = {
        balance: 5000
    };


    addInterest.call(checkingAccount, 6);
    addInterest.apply(savingsAccount, [20]);

    let savingsInterestAdder = addInterest.bind(savingsAccount);
    savingsInterestAdder(20);
    savingsInterestAdder(20);
    savingsInterestAdder(100);
    savingsInterestAdder(10000000000.456764);
}());