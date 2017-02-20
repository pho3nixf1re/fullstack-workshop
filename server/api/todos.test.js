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

test('POST /todo creates new todo', async t => {
  const description = 'answer THE question'

  await mockRequest(todoRoutes).post('/todos')
    .send({ description })
    .expect(200)
    .expect(({ body }) => {
      t.is(body.description, description)
    })
})

test('POST /todo sanitizes todo properties', async t => {
  const description = 'answer THE question'

  await mockRequest(todoRoutes).post('/todos')
    .send({ description, done: true, wtf: 'gotcha' })
    .expect(200)
    .expect(({ body }) => {
      t.is(body.description, description)
      t.true(body.done, true)
      t.is(body.wtf, undefined, 'todo property unsanitized')
    })
})

test('GET /todos/foo returns not found error with empty body', async t => {
  await mockRequest(todoRoutes)
    .get(`/todo/foo`)
    .expect(404)
    .expect({})
})

test('GET /todos/:id returns a single todo', async t => {
  const id = guid()
  const todo = {
    id,
    description: 'bathe the cat'
  }

  await mockRequest(async (ctx, next) => {
    const { todos } = ctx.collections
    todos.insert(todo)
    await next()
  }, todoRoutes)
    .get(`/todos/${id}`)
    .expect(200)
    .expect(todo)
})

test('PUT /todos/foo returns not found error with empty body', async t => {
  await mockRequest(todoRoutes)
    .put(`/todo/foo`)
    .expect(404)
    .expect({})
})

test('PUT /todos/:id returns a single modified todo', async t => {
  const id = guid()
  const todo = {
    id,
    description: 'bathe the cat'
  }

  await mockRequest(async (ctx, next) => {
    const { todos } = ctx.collections
    todos.insert(todo)
    await next()
  }, todoRoutes)
    .put(`/todos/${id}`)
    .send({ done: true })
    .expect(200)
    .expect(({ body }) => t.true(body.done, 'did not modify sent value'))
})

test('PUT /todos/:id sanitizes sent properties', async t => {
  const id = guid()
  const todo = {
    id,
    description: 'bathe the cat'
  }

  await mockRequest(async (ctx, next) => {
    const { todos } = ctx.collections
    todos.insert(todo)
    await next()
  }, todoRoutes)
    .put(`/todos/${id}`)
    .send({ wtf: 'oops!' })
    .expect(200)
    .expect(({ body }) => t.is(body.wtf, undefined, 'did not sanitize properties'))
})

test('DELETE /todos/foo returns not found error with no content', async t => {
  await mockRequest(todoRoutes)
    .delete(`/todo/foo`)
    .expect(404)
    .expect({})
})

test('DELETE /todos/:id returns deleted todo', async t => {
  const id = guid()
  const todo = {
    id,
    description: 'walk the Appalachian Trail'
  }

  await mockRequest(async (ctx, next) => {
    const { todos } = ctx.collections
    todos.insert(todo)
    await next()
  }, todoRoutes)
    .delete(`/todos/${id}`)
    .expect(200)
    .expect(({ body }) => {
      t.is(body.description, todo.description)
      t.is(body.id, todo.id)
    })
})
