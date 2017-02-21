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
      TODO: put list of todos here
    </div>
  )
}

export default Todos
