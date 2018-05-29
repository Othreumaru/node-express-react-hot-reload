const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: ['./src/server/middleware'],
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        path: path.join(__dirname, '.build'),
        filename: 'middleware.js',
        libraryTarget: 'commonjs2',
    },
}
