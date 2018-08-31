/*global google, $*/
(function () {
    'use strict';

    window.initMap = function () {
        let location = { lat: 13.682976569464984, lng: -11.467491953581657 };

        const map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 3
        });

        
        map.addListener('center_changed', event => {
            const loc = map.getCenter();
            console.log(loc.lat(), loc.lng());
        });



        const placeList = $('.list ul');
        const searchInput = $('#searchInput');
        const searchButton = $('#searchButton');
        const listContainer = $('.listContainer');
        const mapContainer = $('#mapContainer');
        let infoWindow = new google.maps.InfoWindow({
            maxWidth: 300
        });
        let markers = [];

        

        searchButton.click( () => {
            listContainer.css('display', 'inline-block');
            mapContainer.css('padding-left', '20%');
            placeList.empty();
            markers.forEach(marker => {
                marker.setMap(null);
            });
            markers = [];
            $.getJSON('http://api.geonames.org/wikipediaSearch?username=bgoldburd&type=json',
            {q: searchInput.val(), maxRows: 20}, placeData => {
                console.log(placeData);
                let bounds = new google.maps.LatLngBounds();
                infoWindow.close();
                placeData.geonames.forEach(place => {
                    $(`<li>
                        <div>${place.title}</div>
                        <img src="${place.thumbnailImg || 'images/marker.png'}" alt="${place.title}"/>
                        <article>${place.summary}<br><a target="_blank" href="https://${place.wikipediaUrl}">learn more</a></article>
                    </li>`)
                    .appendTo(placeList)
                    .click(function () {
                        map.panTo({lat: place.lat, lng: place.lng});
                        map.setZoom(15);
                        infoWindow.close();
                        let article = $(this).find('article');
                        if (article.css('display') === 'none') {
                            article.slideDown('fast');
                        } else {
                            article.slideUp('fast');
                        }
                    });

                    let markerlocation = {lat: place.lat, lng: place.lng };
                    let marker = new google.maps.Marker({
                        position: markerlocation,
                        title: place.title,
                        map: map,
                    });
                    
                    marker.addListener('click', () => {
                        map.setZoom(15);
                        map.panTo({lat: place.lat, lng: place.lng});
                        infoWindow.setContent(`<img class="markerImage" src="${place.thumbnailImg || 'images/marker.png'}"/>${place.summary}`);
                        infoWindow.open(map, marker);
                    });

                    markers.push(marker);
                    
                    bounds.extend(markerlocation);

                });
 
                map.fitBounds(bounds);
            });
        });

        searchInput.on('keydown', event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                searchButton.click();
            }
        });
    };

}());
