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

}());