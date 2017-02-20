import React from 'react'
import store from '../store'

export default function FreezerBinder (Component, propName = 'state') {
  class FreezerBinding extends React.Component {
    state = {
      listener: null
    }

    componentDidMount () {
      const listener = store.on('update', () => this.forceUpdate())
      this.setState({ listener })
    }

    componentWillUnmount () {
      store.off('update', this.state.listener)
    }

    render () {
      const boundState = {
        [propName]: store.get()
      }

      return (
                <Component {...this.props} {...boundState} />
      )
    }
  }

  return FreezerBinding
}
