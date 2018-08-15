/*global $*/
(function () {
    'use strict';

    const name = $('#name');
    const address = $('#address');

    $('#nameAddressForm').on('submit', function (event) {
        $('#userInfo').append(`Your name: ${name.val()}. Your address: ${address.val()}<br>`);
        $('#nameAddressForm')[0].reset();
        event.preventDefault();
    });

    $('#check').on('change', function () {
        if (this.checked) {
            $('fieldset').removeAttr("disabled");
        } else {
            $('fieldset').attr("disabled", "disabled");
        }
    });

}());