'use strict';

class FacetCoords {
    constructor(opts) {
        this.lat = opts.lat;
        this.long = opts.long;
    }

    get back() {
        console.log('Back FacetCoords');

        return this.lat -1
    }

    get front() {
        console.log('Front FacetCoords');

        return this.lat +1;
    }

    get left() {
        console.log('Left FacetCoords');
    }

    get right() {
        console.log('Right FacetCoords')
    }

    get top() {
        console.log('Top FacetCoords');
    }

    get Bottom() {
        console.log('Bottom FacetCoords')
    }
}

export default FacetCoords;