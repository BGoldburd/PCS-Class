(function(){
    'use strict';

    let body = document.body;

    let backgroundButton = document.getElementById('backgroundButton');
    let textButton = document.getElementById('textButton');

    backgroundButton.addEventListener('click', function () {
        body.style.backgroundColor = document.getElementById('backgroundColor').value;
    });

    textButton.addEventListener('click', function() {
        body.style.color = document.getElementById('textColor').value;
    });

}());