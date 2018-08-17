/*global $, pcs*/
(function () {
    'use strict';

    function reset () {
        $('#fileInput').val('');
    }

    $('#loadButton').click( () => {
        $.get($('#fileInput').val(), loadedData => {
            if ($('#fileInput').val().length === 0) {
                pcs.messageBox.show('please enter a file', true);
                reset();
                return;
            }
            /*$('#resultDiv').text("loading...");
            $('.loader').show();
            setTimeout(() => {
                $('.loader').hide();
                $('#resultDiv').text(loadedData);
            }, 1000);*/
            $(document).ajaxStart(() => {
                $('#resultDiv').text("loading...");
                $('.loader').show();
            });
            $(document).ajaxComplete(() => {
                $('.loader').hide();
                $('#resultDiv').text(loadedData);
            });
            reset();
        }).fail((xhr, statusCode, statusText) => {
            pcs.messageBox.show(statusText, true);
            reset();
        });
    });
}());