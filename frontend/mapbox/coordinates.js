'use strict';

let coords = {};

// CENTER
// (x1 + x3) / 2
// (y1 + y3) / 2;

coords.getCenterBuilding = function getCenterBuilding(coords, indexA, indexB) {
    let ax = coords[indexA][0];
    let ay = coords[indexA][1];
    let bx = coords[indexB][0];
    let by = coords[indexB][1];

    let x = (ax + bx) / 2;
    let y = (by + by) / 2;

    return { x, y };
};

// RADIUS
// SQRT( (Xc - x1) ^ 2 + (Yc + y1) ^2 );

coords.getRadiusBuilding = function getRadiusBuilding(center, point) {
    let dx = center.x - point.x;
    let dy = center.y - point.y;

    return Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) );
};

// A -- 37.807117, -122.417249
// B -- 37.807318, -122.415683
coords.getStreetAngle = function getStreetAngle() {
    let a = {};
    a.x = -122.417249;
    a.y = 37.807117;

    let b = {};
    b.x = -122.415683;
    b.y = 37.807318;

    let dx = b.x - a.x;
    let dy = b.y - a.y;

    return Math.atan(dy/dx);
};

coords.getPolygonPoint = function getPolygonPoint(polygon, index) {
    let x = polygon[index][0];
    let y = polygon[index][1];

    return { x, y };
};

export default coords;