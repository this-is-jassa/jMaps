
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





// #########################################################
// ##################### Observbles ##########################
// #######################################################


let $location = new Rx.BehaviorSubject({
    currentLocation: [0, 0],
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
})


let $mapStyle = new Rx.BehaviorSubject({
    theme: 'outdoors-v11',
    zoom: 17.5, // starting zoom,
    bearing: 0,
    pitch: 30
})





// #########################################################
// ##################### Subscriptions ##########################
// #######################################################


$location.subscribe(res => {
    jmap.flyTo(
        {
            center: [...res.pointer]
        });
    if (res.route.draw) {
        mapObj.drawRoute(res.route.coord);
    }
});

$mapStyle.subscribe(res => {

})






// #########################################################
// ##################### Events ##########################
// #######################################################


location.input1.on('change', (e) => {

    const { lat, lng } = e.suggestion.latlng;

    let LocationData = { ...$location.getValue() };

    LocationData.startLocation = [lng, lat];
    LocationData.pointer = [lng, lat];

    $location.next(LocationData);
})

location.input2.on('change', function resultSelected(e) {

    const { lat, lng } = e.suggestion.latlng;
    let LocationData = { ...$location.getValue() };

    LocationData.endLocation = [lng, lat];
    LocationData.pointer = [lng, lat];

    $location.next(LocationData);

});

$('#searchForm').addEventListener('submit', searchRoute);






// #########################################################
// ##################### Helper Functions ##########################
// #######################################################


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

        dom.showSteps(steps);
        let LocationData = { ...$location.getValue() };

        LocationData.route.draw = true;
        LocationData.route.coord = coords;
        LocationData.route.steps.push(...steps);
        LocationData.route.duration = duration;
        LocationData.route.distance = distance;
        LocationData.pointer = [...LocationData.startLocation];

        $location.next(LocationData);

    };

    req.send();
}




