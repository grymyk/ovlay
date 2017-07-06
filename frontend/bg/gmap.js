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

        let map = new this.api.Map(dom, options);

        this.getMapUrl(map);

        map.addListener('center_changed', function() {
           console.log('center_changed');

           console.log(this);
            //setTimeout( function() {
                this.parseUrl(this.mapUrl);
            //}, 300);
        });
    }

    getMapUrl(map) {
        console.log('getMapUrl');

        setTimeout( ()=> {
            console.log(map);
            console.log(map.mapUrl);

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
