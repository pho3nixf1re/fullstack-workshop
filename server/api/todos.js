const router = require('koa-router')
const { v4: guid } = require('uuid')
const { pick } = require('lodash')

const routes = router({
  prefix: '/todos'
})

module.exports = routes
