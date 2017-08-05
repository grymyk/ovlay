'use strict';

const turf = require('@turf/helpers');
// import facet from './facet.js';
import Facet from './factoryFacet';

import config from './config';

import get3DCoors from './geoPolygon';

let building = [];

//console.log( get3DCoors(config) );

function getHSL(level, numberLevel) {

    let spectrum = 360;
    const HUE_RANGE = spectrum ;

    let hue = (HUE_RANGE / numberLevel) * level;
    let saturations = '50%';
    let lightness = '50%';

    return "hsl(" + hue + ", " + saturations + ", " + lightness + ")";
}

function getRGB(level, numberLevel) {
    const BITE = 256;

    let red = 60;
    let green = Math.floor(( BITE - green) / numberLevel) * level;
    let blue = 181;

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function powerDelta(x) {
    let base = Math.E;
    let exponent = x;

    return Math.pow(base, exponent);
}

function sineDelta(level, period) {
    let numberPeriod = 4;
    let frequency = 2 * Math.PI / period;

    let alpha = frequency * numberPeriod * level;
    let amplitude = Math.pow(10, -5) * 2;

    return amplitude * Math.sin(alpha);
}

function linearDelta(x) {
    let delta = 0.00001;
    //const K = 2;
    const B = 0;

    return delta * x + B;
}

// A -- 37.807117, -122.417249
// B -- 37.807318, -122.415683
function getStreetAngle() {
    let a = {};
    a.x = -122.417249;
    a.y = 37.807117;

    let b = {};
    b.x = -122.415683;
    b.y = 37.807318;

    let dx = b.x - a.x;
    let dy = b.y - a.y;

    return Math.atan(dy/dx);
}

// CENTER
// (x1 + x3) / 2
// (y1 + y3) / 2;

function getCenterBuilding(coords, indexA, indexB) {
    let ax = coords[indexA][0];
    let ay = coords[indexA][1];
    let bx = coords[indexB][0];
    let by = coords[indexB][1];

    let x = (ax + bx) / 2;
    let y = (by + by) / 2;

    return { x, y };
}

// RADIUS
// SQRT( (Xc - x1) ^ 2 + (Yc + y1) ^2 );

function getRadiusBuilding(center, point) {
    let dx = center.x - point.x;
    let dy = center.y - point.y;

    return Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) );
}


// ANGEL
// a = Math.PI / 4
function getOriginPoints(center, radius, angle) {
    let origin = [];

    for (let i = 0, step = Math.PI / 2, points = [], len = 4; i < len; i += 1) {
        // let alpha = step * i + alpha0;
        let alpha = step * i + angle;

        points[0] = center.x + radius * Math.cos(alpha);
        points[1] = center.y + radius * Math.sin(alpha);

        origin.push(points);

        points = [];
    }

    return origin;
}

function getPolygonPoint(polygon, index) {
    let point = {};

    point.x = polygon[index][0];
    point.y = polygon[index][1];

    return point;
}

function getRadiusDelta(radius0, number) {
    return radius0 / (number + 1);
}

function getAngleDelta(angle0, number) {
    return (2 * Math.PI) / number ;
}

function getPolarCoords(coords, level, number) {
    let center = getCenterBuilding(coords, 1, 3);

    let radius0 = 0.0002;

    let angle0 = Math.PI / 4;
    angle0 += getStreetAngle();

    let deltaRadius = getRadiusDelta(radius0, number);
    let deltaAngle = getAngleDelta(angle0, number);

    let radius = - deltaRadius * level + radius0;
    let angle = deltaAngle * level + angle0;

    let points = getOriginPoints(center, radius, angle);
    //console.log(points);

    return points;
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
        shiftedPoints[0] = coords[p][0] + sineDelta(level, number);
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
        //coords: getCoords(config.coords, level, number),
        coords: getPolarCoords(config.coords, level, number),
        level,
        color: getHSL(level, number)
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
