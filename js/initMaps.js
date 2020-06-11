import DOM from './dom.js'

export default class InitMap {


    // #########################################################
    // ##################### Gobal Varibles ##########################
    // #######################################################

    map;

    constructor() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZmFraHIiLCJhIjoiY2pseXc0djE0MHBibzN2b2h4MzVoZjk4aSJ9.ImbyLtfsfSsR_yyBluR8yQ';
        this._init();
    }


    // #########################################################
    // ##################### Helper Functions ##########################
    // #######################################################

    
    // Initialise the map By setting necessory parameters
    _init() {
        this.map = new mapboxgl.Map({
            container: 'map', 
            style: 'mapbox://styles/mapbox/dark-v10', 
            center: [-79.3871, 43.6426], 
            zoom: 17.5,
            bearing: 0,
            pitch: 30
        });
    }


    // Delete Current Route
    reset() {
        if (this.map.getSource('route')) {
            this.map.removeLayer('route');
            this.map.removeSource('route')
        }
    }



    // Draw Up the line on map according to the array of cords

    drawRoute(coords) {
        
        // check if the route is already loaded
        this.reset();

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
                "line-color": "#4264FB",
                "line-width": 10,
                "line-opacity": 1
            }
        });

    }


}
