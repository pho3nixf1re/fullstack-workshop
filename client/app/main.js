import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { AppContainer as HotLoaderContainer } from 'react-hot-loader'

import store from './store'
import { bindToStore } from './actions'
import Root from './components/Root'

bindToStore(store)

store.trigger('todos:fetchAll')

const rootDOMElement = document.getElementById('root')

const mountComponent = Component => (
  render((
    <HotLoaderContainer>
      <Component />
    </HotLoaderContainer>
  ), rootDOMElement)
)

mountComponent(Root)
if (module.hot) {
  module.hot.accept('./components/Root', () => mountComponent(Root))
}
