const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const supertest = require('supertest')
const loadDatastore = require('../../middleware/load-datastore')

function mockRequest (...middleware) {
  const app = new Koa()
  app.use(bodyparser())
  app.use(loadDatastore)

  middleware.forEach(warez => app.use(warez))

  return supertest(app.listen())
}

module.exports = mockRequest
