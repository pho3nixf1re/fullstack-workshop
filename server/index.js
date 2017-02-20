const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

const loadDatastore = require('./middleware/load-datastore')
const api = require('./api')

const app = new Koa()

app
  .use(bodyParser())
  .use(cors())
  .use(loadDatastore)
  .use(api.routes())
  .use(api.allowedMethods())

app.listen(3000)
