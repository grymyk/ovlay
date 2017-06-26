'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/frontend',

    entry: {
        mapbox: "./mapbox"
    },

    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: "[name].js",
        library: 'mapboxgl'
    },

    watch: NODE_ENV == "development",

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == "development" ? "source-map" : false,

    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader?presets[]=es2015"
        }, {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                }, {
                    loader: "css-loader"
                }
            ]
        }]
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
