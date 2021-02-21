mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuc3dpY2siLCJhIjoiY2l1dTUzcmgxMDJ0djJ0b2VhY2sxNXBiMyJ9.25Qs4HNEkHubd4_Awbd8Og';

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

});
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