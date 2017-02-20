
const todos = db => db.getCollection('todos') || db.addCollection('todos', {
  unique: ['id'],
  indices: ['id']
})

module.exports = todos
