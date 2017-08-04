'use strict';

class Facet {
    constructor(options) {
        const FIRST = 0;

        this.coords = options.coords;

        //console.log(typeof options.coords[FIRST][FIRST]);

        this.setOneCoord(options.coords[FIRST]);

        this.props = {};
        this.setProps(options);
    }

    setProps(options) {
        this.props.color = options.color;
        this.props.level = +options.level;
        this.props.height = options.height * options.level;
        this.props.base_height = this.props.height;
    }

    setOneCoord(coord) {
        this.coords.push(coord);
    }

    getCoords() {
        return this.coords;
    }

    getProps() {
        return this.props;
    }

    get back() {
        console.log('Back Facet');

        return this.lat -1
    }

    get front() {
        console.log('Front Facet');

        return this.lat +1;
    }

    get left() {
        console.log('Left Facet');
    }

    get right() {
        console.log('Right Facet')
    }

    get top() {
        console.log('Top Facet');
    }

    get bottom() {
        console.log('Bottom Facet')
    }
}

export default Facet;