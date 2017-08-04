'use strict';

import './style.css';
import data from './data.js';

//console.log('data', data);

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3J5bXlrIiwiYSI6ImNqM3JtZHl4MzAxZGkydm82eGZrNXdiNmoifQ.AJWTmNEt-6PVlX3HZyvpAg';

let map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-122.418608, 37.807246],
    zoom: 17,
    pitch: 70,
    bearing: 20,
    container: 'map'
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
}));

// the 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', () =>    {
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-opacity': 0.6,
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': {
                'type': 'identity',
                'property': 'height'
            },
            'fill-extrusion-base': {
                'type': 'identity',
                'property': 'min_height'
            }
        }
    });

    map.addLayer({
        'id': 'room-extrusion',
        'type': 'fill-extrusion',
        'source': {
            // Geojson Data source used in vector tiles, documented at
            // https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
            'type': 'geojson',
            'data': data
        },
        'paint': {
            // See the Mapbox Style Spec for details on property functions
            // https://www.mapbox.com/mapbox-gl-style-spec/#types-function

            // Make extrusions slightly opaque for see through indoor walls.
            'fill-extrusion-opacity': 1,
            'fill-extrusion-color': {
                // Get the fill-extrusion-color from the source 'color' property.
                'property': 'color',
                'type': 'identity'
            },
            'fill-extrusion-height': {
                // Get fill-extrusion-height from the source 'height' property.
                'property': 'height',
                'type': 'identity'
            },
            'fill-extrusion-base': {
                // Get fill-extrusion-base from the source 'base_height' property.
                'property': 'base_height',
                'type': 'identity'
            }
        }
    });
});
