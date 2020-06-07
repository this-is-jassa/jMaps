// // import Database from './js/data.service';

// // console.log(Database)

// const database = {
//     currentCoords: [],
//     startingCoords: [],
//     destinationCoords: []
// }

// var map;

// const apiKey = 'f5ee4a045ea9d2b9d41174f7812f7f51';
// const appID = 'plJI4ZSOG6E6';
// mapboxgl.accessToken = 'pk.eyJ1IjoiZmFraHIiLCJhIjoiY2pseXc0djE0MHBibzN2b2h4MzVoZjk4aSJ9.ImbyLtfsfSsR_yyBluR8yQ';


// function onLoad() {

//     if (navigator.geolocation) {

//         navigator.geolocation.getCurrentPosition((position) => {

//             console.log(position)

//             database.currentCoords.push(position.coords.longitude)
//             database.currentCoords.push(position.coords.latitude)

//             map = new mapboxgl.Map({
//                 container: 'map', // container id
//                 style: 'mapbox://styles/mapbox/outdoors-v11', //hosted style id
//                 center: [-79.3871, 43.6426], // starting position
//                 zoom: 18.5, // starting zoom,
//                 bearing: 0,
//                 pitch: 30
//             });


//         });

//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }

//     var placesAutocomplete1 = places({
//         appId: appID,
//         apiKey: apiKey,
//         container: document.querySelector('#address-input1'),
//         templates: {
//             value: function (suggestion) {
//                 console.log(suggestion);
//                 return suggestion.name;
//             }
//         }
//     }).configure({
//         type: 'address'
//     });

//     var placesAutocomplete2 = places({
//         appId: appID,
//         apiKey: apiKey,
//         container: document.querySelector('#address-input2'),
//         templates: {
//             value: function (suggestion) {
//                 return suggestion.name;
//             }
//         }
//     }).configure({
//         type: 'address'
//     });

//     placesAutocomplete1.on('change', function resultSelected(e) {
//         const { lat, lng } = e.suggestion.latlng;
//         database.startingCoords = [lng, lat];
//         map.flyTo(
//             {
//                 center: [lng, lat],
//                 zoom: 17.5, // starting zoom,
//                 bearing: 0,
//                 pitch: 30
//             });
//     });
//     placesAutocomplete2.on('change', function resultSelected(e) {
//         const { lat, lng } = e.suggestion.latlng;
//         database.destinationCoords = [lng, lat];
//         map.flyTo(
//             {
//                 center: [lng, lat],
//                 zoom: 17.5, // starting zoom,
//                 bearing: 0,
//                 pitch: 30
//             });


//     });

// }

// // 3066 Bonaventure Drive

// function setCurrentStarting() {
//     database.startingCoords = [...database.currentCoords]
//     // database.startingCoords = [-79.6544, 43.7166];
//     document.querySelector('#address-input1').value = 'Your Location';
//     map.flyTo({ center: [...database.currentCoords] });
//     // map.flyTo({ center: [-79.6544, 43.7166] });
// }


// function searchRoute() {
//     map.flyTo(
//         {
//             center: [...database.startingCoords],
//             zoom: 17.5, // starting zoom,
//             bearing: 0,
//             pitch: 30
//         });

//     const newCoords = database.startingCoords.join(',') + ';' + database.destinationCoords.join(',');
//     console.log(newCoords);
//     getMatch(newCoords);
// }

// // make a directions request

// function getMatch(e) {
//     var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + e
//         + '?geometries=geojson&steps=true&access_token=' + mapboxgl.accessToken;
//     var req = new XMLHttpRequest();
//     req.responseType = 'json';
//     req.open('GET', url, true);
//     req.onload = function () {
//         var jsonResponse = req.response;
//         var distance = jsonResponse.routes[0].distance * 0.001;
//         var duration = jsonResponse.routes[0].duration / 60;
//         var steps = jsonResponse.routes[0].legs[0].steps;
//         var coords = jsonResponse.routes[0].geometry;
//         //  console.log(steps);
//         console.log(coords);
//         console.log(distance)
//         console.log(duration)
//         console.log(steps)


//         const list = steps.map(step => {
//             return ' <li class="list-group-item  mx-2 " style="margin-top: 0; margin-bottom: 0">' + step.maneuver.instruction + '</li>'
//         })

//         document.querySelector('#directions').innerHTML = list.join("");
//         document.querySelector('#duration').innerHTML = Math.round(duration * 10) / 10 + ' Min to go';


//         addRoute(coords);
//         //  console.log(coordinates);

//     };
//     req.send();
// }


// function addRoute(coords) {
//     // check if the route is already loaded
//     if (map.getSource('route')) {
//         map.removeLayer('route');
//         map.removeSource('route')
//     } else {
//         map.addLayer({
//             "id": "route",
//             "type": "line",
//             "source": {
//                 "type": "geojson",
//                 "data": {
//                     "type": "Feature",
//                     "properties": {},
//                     "geometry": coords
//                 }
//             },
//             "layout": {
//                 "line-join": "round",
//                 "line-cap": "round"
//             },
//             "paint": {
//                 "line-color": "#1D1B1B",
//                 "line-width": 10,
//                 "line-opacity": 1
//             }
//         });
//     };
// }

