
const allProductInfos =
const allProductInfos = [{title: "Snow",
location: "-72.4,36.3",
quantity: 6,
price: 60.0,
description: "In your face. Fresh, unused.",
tags: "food,toiletries"},
{title: "Assorted toiletries",
location: "-71.05950035013201,42.35626775057529",
quantity: 10,
price: 0,
description: "Free toothbrushes, toothpaste, and shower supplies",
tags: "free, toiletries"},
{title: "Gallon jugs of water",
location: "-71.0492256976001,42.359249986095406",
quantity: 20,
price: 5.00,
description: "Fresh water, may or may not have served as a habitat for marine life",
tags: "water, provisions"},
{title: "Gasoline",
location: "-71.0678967836412,42.35133639063023",
quantity: 200,
price: 10.00,
description: "Standard Gasoline, prices adjusted to demand",
tags: "fuel, resources"},
{title: "Board Games",
location: "-71.08200686112431,42.34740259854416",
quantity: 30,
price: 0,
description: "Free board games to pass the time",
tags: "free, games, toys, children"},
{title: "Portable phone charger",
location: "-71.0787810741063,42.342791035061445",
quantity: 2,
price: 25,
description: "Something to charge your phone with. Comes pre-charged",
tags: "electricity, technology"},
{title: "Toilet paper",
location: "-71.09216652813654,42.33736222341653",
quantity: 50,
price: 0,
description: "Free toilet paper, 1-ply only",
tags: "free, toiletries, necessity"},
{title: "Children winter clothing",
location: "-71.08694752795913,42.348209640748216",
quantity: 100,
price: 0,
description: "Free winter clothing for children",
tags: "children, clothes, necessities"},
{title: "Knit clothes",
location: "-71.08685332994469,42.34042391929855",
quantity: 7,
price: 5,
description: "Cheap winter garmets made with love",
tags: "clothing, necessities"},
{title: "Hand sanitizer",
location: "-71.0699396687484,42.340937035396095",
quantity: 50,
price: 1,
description: "Home made hand sanitizer for your pesky germs",
tags: "sanitary, clean, toiletries, necessities"},
{title: "Warm socks",
location: "-71.09724074187598,42.3464840409209",
quantity: 200,
price: 0,
description: "Free, warm socks. Not necessarily clean or good-smelling",
tags: "free, clothing"}];

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