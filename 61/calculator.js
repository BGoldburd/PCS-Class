(function () {
    'use strict';

    let display = document.getElementById('display');
    let clear = document.getElementById('clear');
    let numbers = document.getElementById('numbers');
    let operators = document.getElementById('operators');
    let displayVal = '';
    let currentOperator = null;
    let currentValue;
    let decimalPressed = false;
    let numberPressed = false;
    let operatorPressed = null;

    numbers.addEventListener('click', function (event) {
        //don't allow clicking on outer numbers div
        if (event.target.id === 'numbers' || (decimalPressed && event.target.innerHTML === '.') || currentOperator === '=') {
            return;
        }
        let num = event.target.innerHTML;
        displayVal = displayVal + num;
        display.innerHTML = displayVal;
        numberPressed = true;
        if (operatorPressed) {
            operatorPressed.style.backgroundColor = 'lightgreen';
            operatorPressed.style.color = 'black';
        }
        if (event.target.innerHTML === '.') {
            decimalPressed = true;
        }
    });

    operators.addEventListener('click', function (event) {
        //not to allow double pressing operators, besides pressing operators after equals
        if ((!numberPressed && currentOperator !== '=') || event.target.id === 'operators') {
            return;
        }
        let newNum = displayVal !== '' ? Number(displayVal) : currentValue;
        currentValue = currentOperator === '÷' ? currentValue/newNum :
                    currentOperator === '×' ? currentValue*newNum :
                    currentOperator === '-' ? currentValue-newNum :
                    currentOperator === '+' ? currentValue+newNum : 
                    newNum;
        display.innerHTML = currentValue;
        if (event.target.innerHTML !== '=') {    
            operatorPressed = event.target;
            operatorPressed.style.backgroundColor = 'green';
            operatorPressed.style.color = 'white';
        }
        currentOperator = event.target.innerHTML;
        displayVal = '';
        numberPressed = false;
        decimalPressed = false;
    });

    clear.addEventListener('click', function () {
        displayVal = '';
        currentOperator = null;
        currentValue = 0;
        numberPressed = false;
        decimalPressed = false;
        display.innerHTML = currentValue;
        operatorPressed.style.backgroundColor = 'lightgreen';
        operatorPressed.style.color = 'black';
    });


}());