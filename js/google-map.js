var map;
var coordinates = {lat: 59.938851, lng: 30.322961};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: coordinates,
    zoom: 8
  });
}
