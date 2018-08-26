/*global $*/
(function () {
    'use strict';

    const searchInput = $('#searchInput');
    const searchButton = $('#searchButton');
    const photosContainer = $('#photosContainer');
    const carouselContainer = $('#carouselContainer');
    const carouselImage = $('#carouselImage');
    const previous = $('.carousel-control-prev');
    const next = $('.carousel-control-next');
    const h1 = $('h1');

    h1.css('margin-left', -parseFloat(getComputedStyle(h1[0]).width)/2 + 'px');
    h1.css('margin-top', -parseFloat(getComputedStyle(h1[0]).height)/2 + 'px');

    searchButton.click( () => {
        photosContainer.empty();
        let counter = 0;
        $.getJSON(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${searchInput.val()}&format=json&jsoncallback=?`, photos => {
            console.log(photos);
            photos.items.forEach(photo => {
                $(`<figure>
                    <figcaption>
                        <h3>${photo.title}</h3>
                    </figcaption>
                    <img src="${photo.media.m}" alt="${photo.title}">
                </figure>`)
                .appendTo(photosContainer)
                .click( function () {
                    carouselContainer.css('display', 'flex');
                    carouselImage.attr('src', photo.media.m.replace('_m.jpg', '.jpg'));
                    let currentPhoto = $(this).data('number');

                    next.click( () => {
                        currentPhoto++;
                        if(!photos.items[currentPhoto]) {
                            currentPhoto = 0;
                        }
                        carouselImage.attr('src', photos.items[currentPhoto].media.m.replace('_m.jpg', '.jpg'));
                    });

                    previous.click( () => {
                        currentPhoto--;
                        if(!photos.items[currentPhoto]) {
                            currentPhoto = photos.items.length - 1;
                        }
                        carouselImage.attr('src', photos.items[currentPhoto].media.m.replace('_m.jpg', '.jpg'));
                    });
                })
                .data('number', counter++);

                
            });
            
        });
    });

    carouselContainer.click( event => {
        if (event.target.id === 'carouselContainer') {
            carouselContainer.hide();
        }
    });
}());