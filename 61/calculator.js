(function () {
    'use strict';

    function get (id) {
        return document.getElementById(id);
    }
    
    let display = get('display');
    let displayVal = '';
    let currentOperator = null;
    let currentValue;
    let decimalPressed = false;
    let numberPressed = false;
    let operatorPressed = null;

    get('numbers').addEventListener('click', function (event) {
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

    get('operators').addEventListener('click', function (event) {
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

    get('clear').addEventListener('click', function () {
        displayVal = '';
        currentOperator = null;
        currentValue = 0;
        numberPressed = false;
        decimalPressed = false;
        display.innerHTML = currentValue;
        if (operatorPressed) {
            operatorPressed.style.backgroundColor = 'lightgreen';
            operatorPressed.style.color = 'black';
        }
    });

    get('positiveNegative').addEventListener('click', function () {
        if (!numberPressed && currentOperator !== '=') {
            return;
        }
        displayVal = -display.innerHTML;
        display.innerHTML = displayVal;
    });

    get('percent').addEventListener('click', function () {
        if (!numberPressed && currentOperator !== '=') {
            return;
        }
        displayVal = display.innerHTML/100;
        display.innerHTML = displayVal;
    });

}());