'use strict';

const turf = require('@turf/helpers');
// import facet from './facet.js';
import Facet from './factoryFacet';

let building = [];

let numberLevel = 20;
let heightLevel = 3;
let coords = [
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
    ]
];

function getColor(level, numberLevel) {
    const BITE = 256;

    const red = 60;
    let green = 64;
    const blue = 181;

    green = Math.floor(( BITE - green) / numberLevel) * level;

    let color = "rgb(" + red + ", " + green + ", " + blue + ")";
    console.log('color: ', color);

    return color;
}

function getLatitude(level, heightLevel) {

}

function getLongitude(level, heightLevel) {

}

function getAltitude(level, heightLevel) {
    return level * heightLevel;
}

function get3DCoors(basic, numberLevel = 3, heightLevel = 3) {
    let floor3D = [];
    let temp = [];

    for (let level = 0; level < numberLevel; level += 1) {

        for (let point = 0, len = basic.length; point < len; point += 1) {
            temp[point] = basic[point];
            //temp[point][0] = getLatitude(level, heightLevel);
            //temp[point][1] = getLongitude(level, heightLevel);
            temp[point][2] = getAltitude(level, heightLevel);

            //console.log(basic[point]);
        }
        //console.log('----');

        floor3D.push(temp);
    }

    //console.log(floor3D);
}

get3DCoors(coords);

for (let level = 1; level <= numberLevel; level += 1) {
    //console.log('level: ', level);

    let facet = new Facet({
        height: heightLevel,
        coords,
        level,
        color: getColor(level, numberLevel)
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
