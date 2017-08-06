'use strict';

let polar = {};

polar.getRadius = function getRadius(radius0, number) {
    return radius0 / number;
};

polar.getAngle = function getAngle(angle0, number) {
    return 2 * Math.PI / number ;
};

polar.powerDelta = function powerDelta(x) {
    let base = Math.E;

    return Math.pow(base, x);
};

polar.sineDelta = function sineDelta(level, period) {
    let amplitude = Math.pow(10, -5) * 2;

    let numberPeriod = 4;
    let frequency = 2 * Math.PI / period;
    let alpha = frequency * numberPeriod * level;

    return amplitude * Math.sin(alpha);
};

polar.linearDelta = function linearDelta(x) {
    let k = 0.00001;
    let b = 0;

    return k * x + b;
};

export default polar;
