//{title, userdets, image, quantity, price, location, description, tags}
const items = [{title: "apple", location: 1, quantity: 2}, {title: "toilet paper", location: 0, quantity: 6}]

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

// --- DATA RETRIEVAL & PROCESSING --- \\

function productInfoToGeoJson(product_info) {
  // NEEDS IMPLEMENTATION
  return 0;
}

// --- MAP RENDERING & PINS --- \\

// ---| Initialization
var map;

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2x1ZWxlc3M0IiwiYSI6ImNrbGQ5d2hwcjBxNGsydm9iMW9saXAxZW0ifQ.9sZd8Fc8ojC_ycnEHXNZ_Q';

// ---| Retrieving Location Data
navigator.geolocation.getCurrentPosition(successLocation,
    errorLocation, { enableHighAccuracy: true
  })

function errorLocation() {
  setupMap([0,0])
}

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]); // northeastern
}

// ---| Map Setup

function setupMap(center) {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 14
  })

  // my location
  var myLocation = new mapboxgl.Marker().setLngLat(center).addTo(map);

  // add markers to map
  geojson.features.forEach(addMarker);
}

function addMarker(marker) {
  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  const pin = new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + marker.properties.title + '</h3><p>'
        + marker.properties.description + '</p>'))
    .addTo(map);

  pin.getElement().addEventListener('click', () => {
    selectPin(marker);
  });
}

// --- SEARCH BAR & RESULTS --- \\

// ---| Search Results
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
      selectPin(item);
    }
    list.appendChild(button);
  })
}

//search.onchange = inputHandler;
const updateSearchResults = function() {
var term = document.getElementById('search').value;
  loadList(filterSearchResults(term));
}

function filterSearchResults(searchInput) {
  return items.filter(item => item.title.includes(searchInput));
}

function selectPin(product_info) {
  alert("ee");
}