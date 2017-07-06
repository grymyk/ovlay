'use strict';

const turf = require('@turf/helpers');
import facet from './facet.js';

let features = [
    turf.polygon([facet.top.coords], facet.top.props),
    turf.polygon([facet.bottom.coords], facet.bottom.props),
    turf.polygon([facet.left.coords], facet.left.props),
    turf.polygon([facet.right.coords], facet.right.props),
    turf.polygon([facet.front.coords], facet.front.props),
    turf.polygon([facet.back.coords], facet.back.props)
];

export default turf.featureCollection(features);
