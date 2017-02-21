const test = require('ava')
const { v4: guid } = require('uuid')
const mockRequest = require('../lib/test-helpers/mock-request')
const todoRoutes = require('./todos').routes()

test('GET /todos returns empty array when no todos', async t => {
  await mockRequest(todoRoutes).get('/todos')
    .expect(200)
    .expect([])
})

test('GET /todos returns array of all todos', async t => {
  await mockRequest(async (ctx, next) => {
    const { todos } = ctx.collections

    ;[
      {
        id: 'foo',
        description: 'buy milk'
      },
      {
        id: 'bar',
        description: 'shop for presents'
      }
    ].forEach(todo => {
      todos.insert(todo)
    })

    await next()
  }, todoRoutes).get('/todos')
    .expect(200)
    .then(({ body }) => {
      t.is(body.length, 2, 'incorrect number of todos returned')
    })
})
