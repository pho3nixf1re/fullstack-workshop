import React from 'react'
import store from '../store'
import Loading from './Loading'

const styles = {
  row: {
    display: 'flex'
  },
  remove: {
    marginRight: 10
  }
}

const Todos = ({ loading, todos }) => {
  if (loading) {
    return <Loading />
  }

  return (
    <div>
      {todos.map(({ id, description }) => (
        <div key={id} style={styles.row}>
          <a
            href='#'
            onClick={() => store.trigger('todos:remove', { id })}
            style={styles.remove}
          >X</a>
          <div>{description}</div>
        </div>
      ))}
    </div>
  )
}

export default Todos
