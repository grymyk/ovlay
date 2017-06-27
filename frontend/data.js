'use strict';

const turf = require('@turf/helpers');
import polygon from './coords.js';

let top = turf.polygon(polygon.top);
let botton = turf.polygon(polygon.bottom);

let features = [
    turf.polygon([polygon.top.coords], polygon.top.props),
    turf.polygon([polygon.bottom.coords], polygon.bottom.props)
];

export default turf.featureCollection(features);
