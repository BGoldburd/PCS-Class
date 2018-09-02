/*global google, $*/
(function () {
    'use strict';

    window.initMap = function () {
        let location = { lat: 13.682976569464984, lng: -11.467491953581657 };

        const map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 3
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



        //////from here on, for drawing manager////////////////////////////////////////////////
        let allItems = [];
        let selectedItem;
        let selectedItemId;
        var centerControlDiv = document.createElement('div');
        let centerControlDiv2 = document.createElement('div');
        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER
            },
            circleOptions: {
                editable: true,
                draggable: true
            },
            rectangleOptions: {
                editable: true,
                draggable: true
            },
            polygonOptions: {
                editable: true,
                draggable: true
            },
            polylineOptions: {
                editable: true,
                draggable: true
            },
            markerOptions: {
                draggable: true
            }
        });
        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'overlaycomplete', event => {
            let localStorageId = event.type + Date.now();
            console.log('overlaycomplete:', event.overlay);
            if (event.type === 'marker') {
                localStorage.setItem(localStorageId, JSON.stringify(event.overlay.position));
                addMarkerEditor(event.overlay, localStorageId);
            } else if (event.type === 'circle') {
                localStorage.setItem(localStorageId, JSON.stringify({radius: event.overlay.radius, center: event.overlay.center}));
                addCircleEditor (event.overlay, localStorageId);
            } else if (event.type === 'rectangle') {
                localStorage.setItem(localStorageId, JSON.stringify(event.overlay.bounds));
                addRectangleEditor (event.overlay, localStorageId);
            } else if (event.type === 'polygon') {
                localStorage.setItem(localStorageId, JSON.stringify(event.overlay.latLngs.b[0].b));
                addPolygonEditor (event.overlay, localStorageId);
            } else if (event.type === 'polyline') {
                localStorage.setItem(localStorageId, JSON.stringify(event.overlay.latLngs.b[0].b));
                addPolylineEditor (event.overlay, localStorageId);
            }
            allItems.push(event.overlay);
            clickToRemoveSelection (event.overlay, localStorageId);
        });


        /////create all items saved in local storage upon startup/////////////////////////////
        let items = Object.keys(localStorage);
        console.log(items);
        items.forEach( item => {
            if (item.includes('marker')) {
                let marker = new google.maps.Marker({
                    position: JSON.parse(localStorage[item]),
                    map: map,
                    draggable: true
                });
                addMarkerEditor(marker, item);
                clickToRemoveSelection (marker, item);
                allItems.push(marker);
            } else if (item.includes('circle')) {
                let circle = new google.maps.Circle({
                    map: map,
                    center: JSON.parse(localStorage[item]).center,
                    radius: JSON.parse(localStorage[item]).radius,
                    editable: true,
                    draggable: true
                });
                addCircleEditor (circle, item);
                clickToRemoveSelection (circle, item);
                allItems.push(circle);
            } else if (item.includes('rectangle')) {
                let rectangle = new google.maps.Rectangle({
                    map: map,
                    bounds: JSON.parse(localStorage[item]),
                    editable: true,
                    draggable: true
                });
                addRectangleEditor (rectangle, item);
                clickToRemoveSelection (rectangle, item);
                allItems.push(rectangle);
            } else if (item.includes('polygon')) {
                let polygon = new google.maps.Polygon({
                    map: map,
                    paths: JSON.parse(localStorage[item]),
                    editable: true,
                    draggable: true
                });
                addPolygonEditor (polygon, item);
                clickToRemoveSelection (polygon, item);
                allItems.push(polygon);
            }  else if (item.includes('polyline')) {
                let polyline = new google.maps.Polyline({
                    map: map,
                    path: JSON.parse(localStorage[item]),
                    editable: true,
                    draggable: true
                });
                addPolylineEditor (polyline, item);
                clickToRemoveSelection (polyline, item);
                allItems.push(polyline);    
            }
        });



        /////functions for saving edits//////////////////////////////////////////////////
        function addMarkerEditor (marker, id) {
            marker.addListener('dragend', () => {
                localStorage[id] = JSON.stringify(marker.getPosition());
            });
        }

        function addCircleEditor (circle, id) {
            circle.addListener('radius_changed', () => {
                localStorage[id] = JSON.stringify({radius: circle.getRadius(), center: circle.getCenter()});
            });
            circle.addListener('center_changed', () => {
                localStorage[id] = JSON.stringify({radius: circle.getRadius(), center: circle.getCenter()});
            });
        }

        function addRectangleEditor (rectangle, id) {
            rectangle.addListener('bounds_changed', () => {
                localStorage[id] = JSON.stringify(rectangle.getBounds());
            });
        }

        function addPolygonEditor (polygon, id) {
            polygon.addListener('mousedown', () => {
                let path = polygon.getPath();
                path.addListener('set_at', () => {
                    localStorage[id] = JSON.stringify(polygon.getPath().b);
                });
                path.addListener('remove_at', () => {
                    localStorage[id] = JSON.stringify(polygon.getPath().b);
                });
                path.addListener('insert_at', () => {
                    localStorage[id] = JSON.stringify(polygon.getPath().b);
                });
            });
        }

        function addPolylineEditor (polyline, id) {
            polyline.addListener('mousedown', () => {
                let path = polyline.getPath();
                path.addListener('set_at', () => {
                    localStorage[id] = JSON.stringify(polyline.getPath().b);
                });
                path.addListener('remove_at', () => {
                    localStorage[id] = JSON.stringify(polyline.getPath().b);
                });
                path.addListener('insert_at', () => {
                    localStorage[id] = JSON.stringify(polyline.getPath().b);
                });
            });
        }


        //////function for removing selected item///////////////////////////////////////
        function clickToRemoveSelection (item, id) {
            item.addListener('click', () => {
                centerControlDiv2.style.display = 'block';
                selectedItem = item;
                selectedItemId = id;
            });
        }
        
        //////for "clear all" button///////////////////////////////////////////
        centerControlDiv.id = 'centerControlDiv';
        new CenterControl(centerControlDiv);
        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
        
        function CenterControl(controlDiv) {
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.borderRadius = '3px';
            controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '22px';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to clear all';
            controlDiv.appendChild(controlUI);
    
            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '24px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.innerHTML = 'Clear All';
            controlUI.appendChild(controlText);
    
            controlUI.addEventListener('click', function() {
              localStorage.clear();
              allItems.forEach( item => {
                  item.setMap(null);
              });
            });
        }


        ////for 'clear selection' button///////////////////////////////////
        centerControlDiv2.id = 'centerControlDiv2';
        new CenterControl2(centerControlDiv2);
        centerControlDiv2.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv2);
        
        function CenterControl2(controlDiv) {
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.borderRadius = '3px';
            controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '22px';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to clear selection';
            controlDiv.appendChild(controlUI);
    
            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '24px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.innerHTML = 'Clear Selection';
            controlUI.appendChild(controlText);
    
            controlUI.addEventListener('click', function() {
                selectedItem.setMap(null);
                centerControlDiv2.style.display = 'none';
                localStorage.removeItem(selectedItemId);
            });
    
        }
    };

}());
