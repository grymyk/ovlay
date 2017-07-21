'use strict';

import Facet from './factoryFacet';

let config = {
    floor: 10,
    level_height: 3,
    color: "salmon",

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
        ]
    ]
};

let top = new Facet(config);

//console.log('coords: ', top.getCoords);
//console.log('props: ', top.getProps);

//console.log( coords.bottom );
//console.log( coords.top );

let basic = [
    // A
    [
        -122.416608,
        37.807246
    ],
    // B
    [
        -122.416844,
        37.807220
    ],
    // C
    [
        -122.416881,
        37.807356
    ],
    // D
    [
        -122.416645,
        37.807386
    ],
    // A
    [
        -122.416608,
        37.807246
    ]
];

// A.lat = D.lat +1
// B.lat = C.lat +1

let back = {
    props: {
        "level": 1,
        "name": "back",
        "height": 15,
        "base_height": 0,
        "color": "magento"
    },

    coords: [
        [
            -122.416645,
            37.807387
        ],
        [
            -122.416881,
            37.807356
        ],
        [
            -122.416881,
            37.807356
        ],
        [
            -122.416645,
            37.807387
        ],
        [
            -122.416645,
            37.807387
        ]
    ]
};

// C.lat = B.lat +1
// D.lat = A.lat +1

let front = {
    props: {
        "level": 1,
        "name": "front",
        "height": 15,
        "base_height": 0,
        "color": "lime"
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
            -122.416844,
            37.807221
        ],
        [
            -122.416608,
            37.807246
        ],
        [
            -122.416608,
            37.807246
        ]
    ]
};

// A.long = B.long -1
// D.long = C.long -1

let right = {
    props: {
        "level": 1,
        "name": "right",
        "height": 15,
        "base_height": 0,
        "color": "orange"
    },

    coords: [
        [
            -122.416843,
            37.807220
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
            -122.416880,
            37.807356
        ],
        [
            -122.416843,
            37.807220
        ]
    ]
};

// B.long = A.long -1
// C.long = D.long -1

let left = {
    props: {
        "level": 1,
        "name": "left",
        "height": 15,
        "base_height": 0,
        "color": "blue"
    },

    coords: [
        [
            -122.416608,
            37.807246
        ],
        [
            -122.416607,
            37.807246
        ],
        [
            -122.416644,
            37.807386
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

/*let back = ;
let front = ;
let right = ;*/

let bottom = {
    props: {
        "level": 1,
        "name": "bottom",
        "height": 0,
        "base_height": 0,
        "color": "red"
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

export default {
    top,
    bottom,
    left,
    right,
    front,
    back
};
