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

for (let level = 1, BITE = 256; level <= numberLevel; level += 1) {
    //console.log('level: ', level);

    let blue = BITE / level;
    let red = Math.floor(255 - 42.5 * level);
    let color = "rgb(" + red + ", 255, " + blue + ")";
    console.log('color: ', color);

    let facet = new Facet({
        height: heightLevel,
        coords,
        level,
        color
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
