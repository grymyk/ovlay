'use strict';

const turf = require('@turf/helpers');
import polygon from './coords.js';

let features = [
    turf.polygon([polygon.top.coords], polygon.top.props),
    turf.polygon([polygon.bottom.coords], polygon.bottom.props),
    turf.polygon([polygon.left.coords], polygon.left.props),
    turf.polygon([polygon.right.coords], polygon.right.props),
    turf.polygon([polygon.front.coords], polygon.front.props),
    turf.polygon([polygon.back.coords], polygon.back.props)
];

export default turf.featureCollection(features);
