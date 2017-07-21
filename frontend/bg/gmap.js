"use strict";

import './bg.css';
const querystring = require('querystring');

class GoogleMapAPI {
    constructor(api, dom, options) {
        console.log('constructor');
        this.api = api;

        this.api.event.addDomListener(window, "load", this.initialize);
        this.initialize(dom, options);
    }

    initialize(dom, options){
        console.log('init');

        let self = this;

        let map = new this.api.Map(dom, options);

        setTimeout( () => {
            console.log(map);
        }, 1000);

        this.getMapUrl(map);

        map.addListener('center_changed', ()=> {
            console.log('center_changed');

            self.getMapUrl(map);
        });

        map.addListener('tilt_changed', () => {
            console.log('tilt_changed');

            self.getMapUrl(map);
        });

        map.addListener('zoom_changed', () => {
            console.log('zoom_changed');

            self.getMapUrl(map);
        });


        map.addListener('projection_changed', () => {
            console.log('projection_changed');

            self.getMapUrl(map);
        });
    }

    getMapUrl(map) {
        setTimeout( ()=> {
            this.parseUrl(map.mapUrl);
        }, 300);
    }

    parseUrl(url) {
        let queryStr = url.split('?');

        let qsObj = querystring.parse(queryStr[1]);
        console.log(qsObj);
    }

    static main(gmaps, div, options) {
        console.log('main');

        let GoogleMap = new GoogleMapAPI(gmaps, div, options);
    }
}

export default GoogleMapAPI;
