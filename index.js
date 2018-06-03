const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const serverConfig = require('./webpack.config.server')
const clientConfig = require('./webpack.config.client')
const webpack = require('webpack')

const app = express()
const queue = []
let latestMiddleware

const clientCompiler = webpack(clientConfig)
const serverCompiler = webpack(serverConfig)

serverCompiler.watch(
    {
        aggregateTimeout: 300,
        poll: undefined,
    },
    () => {
        // re-require new middleware
        const middleware = require.resolve('./.build/middleware')
        delete require.cache[middleware]
        latestMiddleware = require('./.build/middleware.js').default
        // pass buffered requests to latestMiddleware
        while (queue.length) latestMiddleware.apply(void 0, queue.shift())
    },
)

app.use(
    webpackDevMiddleware(clientCompiler, {
        noInfo: false,
        publicPath: '/',
    }),
)

app.use(webpackHotMiddleware(clientCompiler))

app.use((req, res, next) => {
    if (latestMiddleware) {
        latestMiddleware(req, res, next)
        return
    }
    queue.push([req, res, next])
})

app.listen(8080, () => {
    console.log('Listening on 8080.')
})
