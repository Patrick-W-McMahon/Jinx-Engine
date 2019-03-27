const path = require('path');
require('webpack');

module.exports = {
    entry: {
        jinx: './src/Jinx.js',
        jinxComponents: './src/JinxComponents.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
            {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"}
        ]
      },
    stats: {
        colors: true
    },
    devtool: 'eval-source-map'
};