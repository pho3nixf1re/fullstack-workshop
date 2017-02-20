const router = require('koa-router')
const todos = require('./todos')

const api = router()

api.register('/', ['get', 'post', 'put'], ctx => {
  ctx.status = 501
  ctx.body = {}
})

api.use(
  todos.routes(), todos.allowedMethods()
)

module.exports = api
