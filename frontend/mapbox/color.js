'use strict';

let color = {};

color.getHSL = function getHSL(level, numberLevel) {

    let spectrum = 360;
    const HUE_RANGE = numberLevel * 2;

    let hue = (HUE_RANGE / numberLevel) * level;
    let saturations = '50%';
    let lightness = '50%';

    return "hsl(" + hue + ", " + saturations + ", " + lightness + ")";
};

color.getRGB = function getRGB(level, numberLevel) {
    const BITE = 256;

    let red = 60;
    let green = Math.floor(( BITE - green) / numberLevel) * level;
    let blue = 181;

    return "rgb(" + red + ", " + green + ", " + blue + ")";
};

export default color;
