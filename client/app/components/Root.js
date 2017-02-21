import React from 'react'
import FreezerBinder from '../hocs/FreezerBinder'

import NewTodo from './NewTodo'
import Todos from './Todos'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    paddingTop: 40,
    maxWidth: 1080
  },
  new: {
    marginBottom: 20
  }
}

export const Root = ({ state }) => {
  return (
    <div style={styles.container}>
      <h1>My todo list</h1>
      <div style={styles.new}>
        <NewTodo />
      </div>
      <Todos />
    </div>
  )
}

export default FreezerBinder(Root)
