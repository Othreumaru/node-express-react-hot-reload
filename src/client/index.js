import * as React from 'react'
import { render } from 'react-dom'

const renderApp = () => {
    const ClientView = require('./ClientView').default
    render(<ClientView />, document.getElementById('mount'))
}

renderApp()

if (module.hot) {
    module.hot.accept('./ClientView', renderApp())
}
