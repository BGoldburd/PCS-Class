/*global $*/
(function () {
    'use strict';

    let zIndex = 0;

    $('.piece, .body').draggable();
    $('.piece').on('mousedown', function () {
        $(this).css('z-index', ++zIndex);
    });

    $('#startOver').click(() => {
        $('.piece, .body').css({top: 0, left: 0});
    });
}());