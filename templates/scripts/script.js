console.log([1, 2, 3].map(n => n+1));
const allProductInfos = JSON.parse(JSON.parse(document.getElementById('database_data').innerHTML))
  .map(t => t.fields);

// --- DATA RETRIEVAL & PROCESSING --- \\

const all = any => false;
const defaultFilters = {
  title: all,
  location: all,
  quantity: all,
  price: all,
  description: all,
  tags: all
};
var productFilters = defaultFilters;

function productInfoToFeatures(product_info) {
  return {type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: product_info.location.split(",").map(parseFloat)
    },
    properties: {
      title: product_info.title,
      description: product_info.description
    }
  }
}

function filteredProductInfos() {
  const totalFilter = productInfo =>
    productFilters.title(productInfo.title)
    || productFilters.location(productInfo.location)
    || productFilters.quantity(productInfo.quantity)
    || productFilters.price(productInfo.price)
    || productFilters.description(productInfo.description)
    || productFilters.tags(productInfo.tags);

  return allProductInfos.filter(totalFilter);
}

// --- MAP RENDERING & PINS --- \\

// ---| Initialization
var map;
var markers = [];

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2x1ZWxlc3M0IiwiYSI6ImNrbGQ5d2hwcjBxNGsydm9iMW9saXAxZW0ifQ.9sZd8Fc8ojC_ycnEHXNZ_Q';

// ---| Retrieving Location Data
navigator.geolocation.getCurrentPosition(successLocation,
    errorLocation, { enableHighAccuracy: true
  })

function errorLocation() {
  setupMap([0,0]);
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
  filteredProductInfos().forEach(productInfo => addMarker(productInfoToFeatures(productInfo)));
}

function updateMarkers(productInfos) {
  markers.forEach(function(marker) {
    marker.remove();
  })
  markers = [];

  productInfos.forEach(function(productInfo) {
    addMarker(productInfoToFeatures(productInfo));
  })
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

  markers.push(pin);
}

// --- SEARCH BAR & RESULTS --- \\

// ---| Search Results
// loadList(filterResults("apple"));
// takes in a dictionary representing item {title: "", description: "", location: ...}
function loadList(productInfos) {
  var list = document.getElementById('items');
  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }

  productInfos.forEach(function (productInfo) {
    var button = document.createElement('button');
    button.textContent = productInfo.title + " x" + productInfo.quantity;
    button.onclick = function() {
      // identifying pins by their location?
      selectPin(productInfo);
    }
    list.appendChild(button);
  })
}

//search.onchange = inputHandler;
const updateSearchResults = function() {
  var searchInput = document.getElementById('search').value;

  const inString = (sub, sup) => sup.toLowerCase().includes(sub.toLowerCase());
  productFilters.title = title => inString(searchInput, title);
  productFilters.description = description => inString(searchInput, description);
  productFilters.tags = tags => inString(searchInput, tags);

  const products = filteredProductInfos();

  loadList(products);
  updateMarkers(products);
}

function selectPin(productInfo) {
  /*var button = document.createElement('button');
  button.textContent = item.title + " x" + item.quantity;*/
  map.flyTo({ center: productInfo.location.split(",").map(parseFloat),
   essential: true });
}