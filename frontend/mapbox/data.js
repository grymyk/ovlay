'use strict';

const turf = require('@turf/helpers');
// import facet from './facet.js';
import Facet from './factoryFacet';

import config from './config';

import get3DCoors from './geoPolygon';

import color from './color';

import coordinates from './coordinates';
import polar from './deltaPolar';

let building = [];

//console.log( get3DCoors(config) );

// ANGEL
// a = Math.PI / 4
function getOriginPoints(center, radius, angle) {
    let origin = [];

    for (let i = 0, step = Math.PI / 2, points = [], len = 4; i < len; i += 1) {
        let alpha = step * i + angle;

        points[0] = center.x + radius * Math.cos(alpha);
        points[1] = center.y + radius * Math.sin(alpha);

        origin.push(points);

        points = [];
    }

    return origin;
}

function getPolarCoords(coords, level, number) {
    let center = coordinates.getCenterBuilding(coords, 1, 3);

    let radius0 = 0.0002;

    let angle0 = Math.PI / 4;
    angle0 += coordinates.getStreetAngle();

    let deltaRadius = polar.getRadius(radius0, number);
    let deltaAngle = polar.getAngle(angle0, number);

    let radius = - deltaRadius * level + radius0;
    let angle = deltaAngle * level + angle0;

    return getOriginPoints(center, radius, angle);
}

function getCoords(coords, level, number) {
    /*[
        -122.416608,
        37.807246
    ]*/

    let delta = 0.000055;
    let shiftedCoords = [];

    for (let p = 0, len = coords.length, shiftedPoints = []; p < 4; p += 1 ) {
        //shiftedPoints[0] = coords[p][0] + delta;
        // shiftedPoints[0] = coords[p][0] + linearDelta(level);
        //shiftedPoints[0] = coords[p][0] + powerDelta(level);

        // sine()
        shiftedPoints[0] = coords[p][0] + polar.sineDelta(level, number);
        shiftedPoints[1] = coords[p][1];

        shiftedCoords.push(shiftedPoints);

        shiftedPoints = [];
    }

    //console.log(shiftedCoords);

    return shiftedCoords;
}

for (let level = 1, number = config.numberLevel; level <= number; level += 1) {
    let facet = new Facet({
        height: config.heightLevel,
        coords: getCoords(config.coords, level, number),
        //coords: getPolarCoords(config.coords, level, number),
        level,
        color: color.getHSL(level, number)
    });

    //console.log(facet);
    //console.log( facet.getCoords() );
    //console.log( facet.getProps() );

    let floor = turf.polygon([facet.getCoords()], facet.getProps());

    building.push(floor);

    facet = null;
    floor = null;
}

//console.log('building', building);

let bottom = {
    props: {
        level: 1,
        name: "bottom",
        height: 0,
        base_height: 0,
        color: "red"
    },

    coords: [
        [
            -122.416608,
            37.807246
        ],
        [
            -122.416844,
            37.807220
        ],
        [
            -122.416881,
            37.807356
        ],
        [
            -122.416645,
            37.807386
        ],
        [
            -122.416608,
            37.807246
        ]
    ]
};

let features = [
    //turf.polygon([facet.top.coords], facet.top.props),
    turf.polygon([bottom.coords], bottom.props)
    //turf.polygon([facet.bottom.coords], facet.bottom.props),
    //turf.polygon([facet.left.coords], facet.left.props),
    //turf.polygon([facet.right.coords], facet.right.props),
    //turf.polygon([facet.front.coords], facet.front.props),
    //turf.polygon([facet.back.coords], facet.back.props)
];

//export default turf.featureCollection(features);
export default turf.featureCollection(building);
