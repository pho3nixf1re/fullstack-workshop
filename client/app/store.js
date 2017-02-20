import Freezer from 'freezer-js'

export const DEFAULT_STATE = {
  todos: {
    data: [],
    loading: false
  }
}

export default new Freezer(DEFAULT_STATE)
