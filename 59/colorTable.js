(function() {
    'use strict';

    ////for looping color array//////////////////////////
    /*let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink'];
    let loop1 = 0;
    let loop2 = 1;*/

    /////for looping through RGB/////////////////////////////
    //let r1 = 0, g1 = 0, b1 = 0, r2 = 50, g2 = 50, b2 = 50;

    function randomizeColors() {
        ////////using Math.random()////////////////////////////////
        document.body.style.backgroundColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        document.body.style.color = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        
        ////////for looping color array///////////////////////
        /*document.body.style.backgroundColor = colors[loop1++];
        if (loop1 === colors.length) {
            loop1 = 0;
        }

        document.body.style.color = colors[loop2++];
        if (loop2 === colors.length) {
            loop2 = 0;
        }*/

        ////////for looping through RGB///////////////////////////////
        /*if (r1>255){r1=0;} if (g1>255){g1=0;} if (b1>255){b1=0;} 
        if (r2>255){r2=0;} if (g2>255){g2=0;} if (b2>255){b2=0;}
        document.body.style.backgroundColor = 'rgb(' + r1++ + ',' + g1++ + ',' + b1++ + ')';
        document.body.style.color = 'rgb(' + r2++ + ',' + g2++ + ',' + b2++ + ')';*/

    }

    let intervalId;
    let theButton = document.getElementById('theButton');
    theButton.addEventListener('click', function () {
        if (!intervalId) {
            intervalId = setInterval(randomizeColors, 500);
            theButton.innerHTML = 'Stop';
        } else {
            clearInterval(intervalId);
            intervalId = null;
            theButton.innerHTML = 'Start';
            let newColors = {
                bgColor: document.body.style.backgroundColor,
                textColor: document.body.style.color,
                time: new Date().toLocaleString()
            };
            addColors(newColors);
        }
    });

    let theTable = document.getElementById('colorsTable');
    let capturedColors = [];

    function addColors(newColors) {
        if (!capturedColors.length) {
            theTable.deleteRow(1);
        }

        capturedColors.push(newColors);

        let row = theTable.insertRow();
        let bgColorCell = row.insertCell();
        let textColorCell = row.insertCell();
        let timeCell = row.insertCell();

        bgColorCell.innerHTML = newColors.bgColor;
        textColorCell.innerHTML = newColors.textColor;
        timeCell.innerHTML = newColors.time;
    }

    theTable.addEventListener('click', function(event) {
        document.body.style.backgroundColor = event.target.parentNode.querySelector("td:nth-child(1)").innerHTML;
        document.body.style.color = event.target.parentNode.querySelector("td:nth-child(2)").innerHTML;
    });
}());