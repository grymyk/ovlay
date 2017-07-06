'use strict';

import GoogleMapAPI from './gmap.js';

const apiKey = 'AIzaSyChpG1CYIteHENYD-UH81FoDl-NmCtv4Ro';
let gmapsApi = require('google-maps-api')(apiKey);
let divMap = document.getElementById('app');
let optionsMap = {
    center: {
        lat: 37.7576171,
        lng: -122.5776844},
    zoom: 20
};

gmapsApi().then(
    (gmaps) => {
        GoogleMapAPI.main(gmaps, divMap, optionsMap);
    },

    (error) => {
        console.log(error);
    }
);
