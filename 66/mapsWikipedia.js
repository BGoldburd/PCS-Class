/*global google, $*/
(function () {
    'use strict';

    window.initMap = function () {
        let location = { lat: 40.09680866454403, lng: -74.2213982035816 };

        const map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 15
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
        let infoWindow = new google.maps.InfoWindow();

        

        searchButton.click( () => {
            listContainer.css('display', 'inline-block');
            mapContainer.css('padding-left', '20%');
            placeList.empty();
            $.getJSON('http://api.geonames.org/wikipediaSearch?username=bgoldburd&type=json',
            {q: searchInput.val(), maxRows: 20}, placeData => {
                console.log(placeData);
                let bounds = new google.maps.LatLngBounds();
                infoWindow.close();
                placeData.geonames.forEach(place => {
                    $(`<li>
                        <div>${place.title}</div>
                        <img src="${place.thumbnailImg || 'images/marker.png'}" alt="${place.title}"/>
                    </li>`)
                    .appendTo(placeList)
                    .click(function () {
                        map.panTo({lat: place.lat, lng: place.lng});
                        map.setZoom(15);
                        infoWindow.close();
                        if (!this.children[2]) {
                            $(this).append(`<article>${place.summary}<br><a target="_blank" href="https://${place.wikipediaUrl}">learn more</a></article>`);
                        } else {
                            $(this.children[2]).remove();
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
                    
                    bounds.extend(markerlocation);
                    map.fitBounds(bounds);

                });
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
