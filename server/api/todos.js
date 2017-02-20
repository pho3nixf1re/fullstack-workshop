const router = require('koa-router')
const { v4: guid } = require('uuid')
const { pick } = require('lodash')

const routes = router({
  prefix: '/todos'
})

const sanitizeTodoProperties = todo => pick(todo, ['description', 'done'])

routes.get('/', ctx => {
  const { todos } = ctx.collections
  const allTodos = todos.find()

  ctx.body = allTodos
})

routes.post('/', ctx => {
  const { todos } = ctx.collections
  let { body: data } = ctx.request

  data = sanitizeTodoProperties(data)

  data.id = guid()
  const todo = todos.insert(data)

  ctx.body = todo
})

routes.get('/:id', ctx => {
  const { todos } = ctx.collections
  const todo = todos.findOne({ id: { '$eq': ctx.params.id } })

  if (!todo) {
    ctx.status = 404
    ctx.body = {}
    return
  }

  ctx.body = todo
})

routes.put('/:id', ctx => {
  const { todos } = ctx.collections
  let { body: data } = ctx.request

  data = sanitizeTodoProperties(data)

  const todo = todos.findOne({ id: { '$eq': ctx.params.id } })

  if (!todo) {
    ctx.status = 404
    ctx.body = {}
    return
  }

  Object.assign(todo, data)
  todos.update(todo)

  ctx.body = todo
})

routes.delete('/:id', ctx => {
  const { todos } = ctx.collections
  const { id } = ctx.params
  const todo = todos.findOne({ id: { '$eq': id } })

  if (!todo) {
    ctx.status = 404
    ctx.body = {}
    return
  }

  todos.remove(todo)
  ctx.status = 200
  ctx.body = todo
})

module.exports = routes
