mapboxgl.accessToken =
        'pk.eyJ1IjoiY2x1ZWxlc3M0IiwiYSI6ImNrbGQ5d2hwcjBxNGsydm9iMW9saXAxZW0ifQ.9sZd8Fc8ojC_ycnEHXNZ_Q';

navigator.geolocation.getCurrentPosition(successLocation,
    errorLocation, { enableHighAccuracy: true
  })

function errorLocation() {
  setupMap([0,0])
}

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]); // northeastern
}

function setupMap(center) {
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 14
  })

  // my location
  var myLocation = new mapboxgl.Marker().setLngLat(center).addTo(map);

  // data points (hardcoded rn)
  var geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-71.0875, 42.3398]
      },
      properties: {
        title: 'Northeastern',
        description: 'Virtual Quad ;)'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-71.1049, 42.3374]
        },
      properties: {
        title: 'Boston Children Hospital',
        description: 'For the children'
      }
    }]
  }

        // add markers to map
        geojson.features.forEach(function(marker) {

          // create a HTML element for each feature
          var el = document.createElement('div');
          el.className = 'marker';

          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h3>' + marker.properties.title + '</h3><p>'
              + marker.properties.description + '</p>'))
            .addTo(map)
        })
      }
/*
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [-74.50, 40], // starting position
    zoom: 9 // starting zoom
});

var biggerSmaller;

map.on('load', function() {
    var mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
    var mapDiv = document.getElementById('map');
    var breakButton = document.getElementById('resizeDiv');
    var fixButton = document.getElementById('resizeMap');
    var sidebar = document.getElementById('menu');

    breakButton.onclick = function() {
        if (biggerSmaller !== 'smaller') {
            mapDiv.style.width = '80vw';
            mapCanvas.style.width = '100%';
            sidebar.style.width = '20vw';
            biggerSmaller = 'smaller';
        } else {
            mapDiv.style.width = '100vw';
            mapCanvas.style.width = '100%';
            sidebar.style.width = '0';
            biggerSmaller = 'bigger';
        }
    }
    map.resize();
    fixButton.onclick = function() {
        map.resize();
    }

});*/
//{title, userdets, image, quantity, price, location, description, tags}
const items = [{title: "apple", location: 1, quantity: 2}, {title: "toilet paper", location: 0, quantity: 6}]

// loadList(filterResults("apple"));
// takes in a dictionary representing item {title: "", description: "", location: ...}
function loadList(items) {
    var list = document.getElementById('items');
    while(list.firstChild) {
                list.removeChild(list.firstChild);
            }

    items.forEach(function (item) {
        var button = document.createElement('button');
        button.textContent = item.title + " x" + item.quantity;
        button.onclick = function() {
            // identifying pins by their location?
            selectPin(item.location);
        }
        list.appendChild(button);
    })
}

function selectPin(location) {
}

//search.onchange = inputHandler;
const inputHandler = function() {
var term = document.getElementById('search').value;
  loadList(filterResults(term));
}

function filterResults(input) {
    return items.filter(item => item.title.includes(input));
}