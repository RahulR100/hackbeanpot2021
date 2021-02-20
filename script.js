mapboxgl.accessToken = 'pk.eyJ1IjoiY2xhY2tsZXMiLCJhIjoiY2tsZHdlaTlrMDFnMTJycGtzd2U2N3o4cCJ9.ep_9AGLzEFJCesJ2P8oAHg';
navigator.geolocation.getCurrentPosition(successLocation, errorLocation,
 { enableHighAccuracy: true });

function successLocation() {
    setupMap()
}

function errorLocation() {
}

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});