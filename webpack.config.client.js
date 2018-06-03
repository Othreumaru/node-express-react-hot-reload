const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: ['webpack-hot-middleware/client', './src/client/index.js'],
    },
    output: {
        filename: '.client-build/[name]-bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'html-loader?interpolate=require!assets/index.html',
        }),
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg|eot|woff|woff2|ttf)$/i,
                use: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        chrome: '67',
                                    },
                                },
                            ],
                            'react',
                        ],
                        plugins: [
                            'transform-class-properties',
                            'transform-object-rest-spread',
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
}
