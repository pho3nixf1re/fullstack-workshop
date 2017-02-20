import { forEach } from 'lodash'
import todos from './todos'

export function bindToStore (store) {
  const bindActions = actions => forEach(actions,
    (callback, eventName) => store.on(eventName, callback)
  )

  bindActions(todos)
}
