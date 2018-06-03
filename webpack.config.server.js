const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    entry: ['./src/server/middleware'],
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        node: '10.1',
                                    },
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    output: {
        path: path.join(__dirname, '.build'),
        filename: 'middleware.js',
        libraryTarget: 'commonjs2',
    },
}
