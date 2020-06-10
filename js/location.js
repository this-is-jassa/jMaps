export default class Location {


    // #########################################################
    // ##################### Global Variables ##########################
    // #######################################################

    input1;
    input2;


    constructor() {
        this._init()
    }


    // #########################################################
    // ##################### Helper Functions ##########################
    // #######################################################

    
    // Initializing the Form
    _init() {

        const apiKey = 'f5ee4a045ea9d2b9d41174f7812f7f51';
        const appID = 'plJI4ZSOG6E6';

        this.input1 = places({
            appId: appID,
            apiKey: apiKey,
            container: document.querySelector('#address-input1'),
            templates: {
                value: function (suggestion) {
                    return suggestion.name;
                }
            }
        }).configure({
            type: 'address'
        });

        this.input2 = places({
            appId: appID,
            apiKey: apiKey,
            container: document.querySelector('#address-input2'),
            templates: {
                value: function (suggestion) {
                    return suggestion.name;
                }
            }
        }).configure({
            type: 'address'
        });
    }


    // Get the currrent location of user but I am not using it anywhere yet (It is giving inacurate results)
    getCurrentLoc() {
        if (!navigator.geolocation) alert("Geolocation is not supported by this browser."); return;

        navigator.geolocation.getCurrentPosition((position) => {
            return [position.coords.longitude, position.coords.latitude]
        })
    }

}