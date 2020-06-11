
// #########################################################
// ##################### IMPORTS ##########################
// #######################################################

import InitMap from './initMaps.js';
import Location from './location.js';
import DOM from './dom.js';





// #########################################################
// ##################### Global Variables ##########################
// #######################################################

const $ = (s, o = document) => o.querySelector(s);

let mapObj = new InitMap()
let location = new Location();
let dom = new DOM();
let jmap = mapObj.map;

const initialLocation = {
    startLocation: [0, 0],
    endLocation: [0, 0],
    pointer: [-79.3871, 43.6426],   // Indicated where to fly,
    route: {
        draw: false,
        coord: {},
        steps: [],
        duration: 0,
        distance: 0
    }
}



// #########################################################
// ##################### Observbles ##########################
// #######################################################


let $location = new Rx.BehaviorSubject(initialLocation)





// #########################################################
// ##################### Subscriptions ##########################
// #######################################################


$location.subscribe(res => {
    jmap.flyTo(
        {
            center: [...res.pointer]
        });
    if (res.route.draw) {
        console.log("USS")
        mapObj.drawRoute(res.route.coord);
        dom.showSteps([...res.route.steps]);
    }
});





// #########################################################
// ##################### Events ##########################
// #######################################################


location.input1.on('change', (e) => setLatLong(e, true))
location.input2.on('change', (e) => setLatLong(e, false));

$('#searchForm').addEventListener('submit', searchRoute);
$('#reset').addEventListener('click', reset)
$('#themeToggle').addEventListener('click', changeTheme)





// #########################################################
// ##################### Helper Functions ##########################
// #######################################################


function setLatLong(e, inStartLocation = true) {

    const { lat, lng } = e.sudggestion.latlng;
    let LocationData = { ...$location.getValue() };

    (inStartLocation)? LocationData.startLocation = [lng, lat]: LocationData.endLocation = [lng, lat];

    LocationData.pointer = [lng, lat];

    $location.next({ ...LocationData });
}



function searchRoute(event) {
    event.preventDefault();

    let LocationData = { ...$location.getValue() };

    const newCoords = LocationData.startLocation.join(',') + ';' + LocationData.endLocation.join(',');

    getRoute(newCoords);

}



function getRoute(e) {

    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + e
        + '?geometries=geojson&steps=true&access_token=' + mapboxgl.accessToken;
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload = function () {

        var jsonResponse = req.response;

        var distance = Math.ceil(jsonResponse.routes[0].distance * 0.001);
        var duration = jsonResponse.routes[0].duration / 60;
        var steps = jsonResponse.routes[0].legs[0].steps;
        var coords = jsonResponse.routes[0].geometry;

        console.log(coords);
        console.log(distance)
        console.log(duration)
        console.log(steps)

        let LocationData = { ...$location.getValue() };

        LocationData.route.draw = true;
        LocationData.route.coord = coords;
        LocationData.route.steps.push(...steps);
        LocationData.route.duration = duration;
        LocationData.route.distance = distance;
        LocationData.pointer = [...LocationData.startLocation];

        $location.next({ ...LocationData });

    };

    req.send();
}

function reset() {

    let locationData = { ...$location.getValue() }
    locationData.route.draw = false;

    dom.reset();
    mapObj.reset();

    $location.next(locationData);

}

function changeTheme() {
    const isDark = $('#themeToggle').checked;

    dom.changeTheme(isDark);

    if (isDark) {
        return jmap.setStyle('mapbox://styles/mapbox/' + 'dark-v10');
    }
    jmap.setStyle('mapbox://styles/mapbox/' + 'outdoors-v11');

}



