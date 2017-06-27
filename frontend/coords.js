'use strict';

let top = {
    props: {
        "level": 1,
        "name": "top",
        "height": 15,
        "base_height": 15,
        "color": "salmon"
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
    bottom
};