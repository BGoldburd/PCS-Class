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
        localStorage.clear(0);
        zIndex = 0;
    });

    $('.piece, .body').mouseup(function () {
        console.log('top: ' + $(this).css('top'));
        console.log('left: ' + $(this).css('left'));
        console.log('zindex: ' + $(this).css('z-index'));
        console.log(this.id);
        localStorage.setItem(this.id, JSON.stringify({
            top: $(this).css('top'), 
            left: $(this).css('left'), 
            zIndex: $(this).css('z-index')
        }));
        localStorage.setItem('zIndex', $(this).css('z-index'));
    });

    let allPieces = Object.keys(localStorage);
    zIndex = localStorage.getItem('zIndex');

    allPieces.forEach(piece => {
        $(`#${piece}`).css(JSON.parse(localStorage.getItem(piece)));
    });
    
    $(function () {
        $('body').append('<audio src="media/1-17 Ponchielli_ La Gioconda - Dance.m4a" controls autoplay loop></audio>');
    });
}());