'use strict';

import GoogleMapAPI from './gmap.js';

const apiKey = 'AIzaSyChpG1CYIteHENYD-UH81FoDl-NmCtv4Ro';
let gmapsApi = require('google-maps-api')(apiKey);
let divMap = document.getElementById('app');
let optionsMap = {
    center: {
        lat: 37.80145,
        lng: -122.435366
    },
    zoom: 19,
    mapTypeId: 'satellite',
    heading: 90,
    tilt: 45
};

gmapsApi().then(
    (gmaps) => {
        GoogleMapAPI.main(gmaps, divMap, optionsMap);
    },

    (error) => {
        console.log(error);
    }
);
