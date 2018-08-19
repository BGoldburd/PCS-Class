// /*global $, pcs*/
// (function () {
//     'use strict';

//     function reset () {
//         $('#fileInput').val('');
//     }

//     $('#loadButton').click( () => {
//         $.get($('#fileInput').val(), loadedData => {
//             if ($('#fileInput').val().length === 0) {
//                 pcs.messageBox.show('please enter a file', true);
//                 reset();
//                 return;
//             }
//             /*$('#resultDiv').text("loading...");
//             $('.loader').show();
//             setTimeout(() => {
//                 $('.loader').hide();
//                 $('#resultDiv').text(loadedData);
//             }, 1000);*/
//             $(document).ajaxStart(() => {
//                 $('#resultDiv').text("loading...");
//                 $('.loader').show();
//             });
//             $(document).ajaxComplete(() => {
//                 $('.loader').hide();
//                 $('#resultDiv').text(loadedData);
//             });
//             reset();
//         }).fail((xhr, statusCode, statusText) => {
//             pcs.messageBox.show(statusText, true);
//             reset();
//         });
//     });
// }());




/////without jQuery/////////////////////////////////////////////////////////////
/*global pcs*/
(function () {
    'use strict';

    const loadButton = document.getElementById('loadButton');
    const fileInput = document.getElementById('fileInput');
    const resultDiv = document.getElementById('resultDiv');
    const loader = document.querySelector('.loader');

    function getFile (file) {
        const request = new XMLHttpRequest();

        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                resultDiv.innerText = '';
                loader.style.display = 'none';
                if (request.status < 400) {
                    resultDiv.innerText = request.responseText;
                } else {
                    pcs.messageBox.show(request.statusText, true);
                }
            } else {
                resultDiv.innerText = 'loading...';
                loader.style.display = 'block';
            }
        };
        request.open('GET', file);
        request.send();
    }

    function reset () {
        fileInput.value = '';
    }

    loadButton.addEventListener('click', () => {
        if (fileInput.value.length === 0) {
            pcs.messageBox.show('please enter a file', true);
        } else {
            getFile(fileInput.value);
            reset();
        }
    });
}());