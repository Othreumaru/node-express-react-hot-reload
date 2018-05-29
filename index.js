// ./src/index.js
const express = require('express')
const config = require('./webpack.config.server')
const webpack = require('webpack')

const app = express()
const queue = []
let latestMiddleware

webpack(config).watch(
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

app.use((req, res, next) => {
    console.log('handling request')
    if (latestMiddleware) {
        latestMiddleware(req, res, next)
        return
    }
    queue.push([req, res, next])
})

app.listen(8080, () => {
    console.log('Listening on 8080.')
})
