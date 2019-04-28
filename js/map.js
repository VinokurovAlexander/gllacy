var map;
var coordinates;

function initMap() {
    coordinates = {lat: 59.938851, lng: 30.322961},

     map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 15
}),

    image = 'img/icons/map-marker.png'
    marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: image
    });
}
