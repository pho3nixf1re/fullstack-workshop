import React from 'react'
import store from '../store'

const todoSubmitted = event => {
  const { value: description } = event.target

  if (event.key !== 'Enter' || description === '') {
    return
  }

  store.trigger('todos:create', { description })
  event.target.value = ''
}

const NewTodo = () => (
  <div>
    <input placeholder='New todo...' onKeyPress={todoSubmitted} />
  </div>
)

export default NewTodo
