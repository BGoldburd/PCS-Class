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
    let currentPhoto = 0;
    let pictures;

    h1.css('margin-left', -parseFloat(getComputedStyle(h1[0]).width)/2 + 'px');
    h1.css('margin-top', -parseFloat(getComputedStyle(h1[0]).height)/2 + 'px');

    searchButton.click( () => {
        photosContainer.empty();
        let counter = 0;
        $.getJSON(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${searchInput.val()}&format=json&jsoncallback=?`, photos => {
            console.log(photos);
            pictures = photos.items.map(item => ({ title: item.title, url: item.media.m }));
            pictures.forEach(photo => {
                let figure = $(document.createElement('figure'));
                let figcaption = $(document.createElement('figcaption'));
                let h3 = $(document.createElement('h3'));
                let img = $(document.createElement('img'));

                figure.append(img);
                figure.append(figcaption);
                figcaption.append(h3);

                img.attr('src', photo.url);
                h3.text(photo.title);

                /*$(`<figure>
                        <figcaption>
                            <h3>${photo.title}</h3>
                        </figcaption>
                        <img src="${photo.media.m}" alt="${photo.title}">
                    </figure>`)*/
                figure.appendTo(photosContainer)
                .click( function () {
                    carouselContainer.css('display', 'flex');
                    carouselImage.attr('src', photo.url.replace('_m.jpg', '.jpg'));
                    currentPhoto = $(this).data('number');    
                })
                .data('number', counter++);

                /*originally load photos with low quality, then reload with high quality
                to help with speed and efficiency*/
                setTimeout( () => {
                    img.attr('src', photo.url.replace('_m.jpg', '.jpg'));
                }, 0);
                
            });
            
        });
    });

    next.click( () => {
        currentPhoto++;
        if(!pictures[currentPhoto]) {
            currentPhoto = 0;
        }
        carouselImage.attr('src', pictures[currentPhoto].url.replace('_m.jpg', '.jpg'));
    });

    previous.click( () => {
        currentPhoto--;
        if(!pictures[currentPhoto]) {
            currentPhoto = pictures.length - 1;
        }
        carouselImage.attr('src', pictures[currentPhoto].url.replace('_m.jpg', '.jpg'));
    });

    carouselContainer.click( event => {
        if (event.target.id === 'carouselContainer') {
            carouselContainer.hide();
        }
    });

    searchInput.on('keydown', event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            searchButton.click();
        }
    });
}());