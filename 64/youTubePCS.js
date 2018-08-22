/*global $*/
(function () {
    'use strict';

    const videoList = $('.list ul');
    const videoElement = $('.result video');
    const defaultImage = "images/defaultVideo.jpg";

    $.get('videos.json', videos => {
        videos.forEach(video => {
            $(`<li>
                <div>${video.title}</div>
                <img src="${video.image || defaultImage}" alt="${video.title}"/>
            </li>`)
            .appendTo(videoList)
            .click(() => {
                videoElement.attr('src', video.url);
                videoElement.attr('controls', true);
                videoElement[0].play();
            });
        });
    });

}());