import DOM from './dom.js'

export default class InitMap {

    map;

    constructor() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZmFraHIiLCJhIjoiY2pseXc0djE0MHBibzN2b2h4MzVoZjk4aSJ9.ImbyLtfsfSsR_yyBluR8yQ';
        this._init();
    }

    _init() {
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/outdoors-v11', //hosted style id
            center: [-79.3871, 43.6426], // starting position
            zoom: 17.5, // starting zoom,
            bearing: 0,
            pitch: 30
        });
    }



    drawRoute(coords) {
        // check if the route is already loaded
        if (this.map.getSource('route')) {
            this.map.removeLayer('route');
            this.map.removeSource('route')
        }
        this.map.addLayer({
            "id": "route",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": coords
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#1D1B1B",
                "line-width": 10,
                "line-opacity": 1
            }
        });

    }


}
