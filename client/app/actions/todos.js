import store from '../store'

const API_URI = 'http://localhost:3000'

const apiUrl = path => `${API_URI}${path}`

const todoActions = {
  'todos:create': todo => {
    fetch(apiUrl('/todos'), {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        return response.json()
      })
      .then(data => store.get().todos.data.push(data))
  },
  'todos:fetchAll': () => {
    store.get().todos.set({ loading: true })

    fetch(apiUrl('/todos'))
      .then(response => {
        store.get().todos.set({ loading: false })

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        return response.json()
      })
      .then(data => store.get().todos.set({ data }))
      .catch(error => {
        store.get().todos.set({ loading: false })
        throw error
      })
  },
  'todos:remove': ({ id }) => {
    fetch(apiUrl(`/todos/${id}`), { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const { todos } = store.get()
        const todoIndex = todos.data.findIndex(t => t.id === id)

        todos.data.splice(todoIndex, 1)
      })
  }
}

export default todoActions
