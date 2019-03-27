const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Pong',
            template: './public/template.html',
            pageHeader: 'Pong Example',
        }),
        new CopyWebpackPlugin([
            {from:'./public/style.css', to:'./'}
        ])
    ],
    module: {
        rules: [
            {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
            {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"}
        ]
      },
    stats: {
        colors: true
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build/'
    }
};