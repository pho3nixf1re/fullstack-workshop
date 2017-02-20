const Loki = require('lokijs')
const path = require('path')

const todos = require('../collections/todos')

function initializeDB () {
  return new Loki(
    path.resolve(__dirname, '../datastore.db'),
    {
      verbose: true,
      autosave: true,
      autosaveInterval: 1000,
      serializationMethod: 'pretty',
      throttledSave: true
    }
  )
}

function initializeTestDB () {
  return new Loki('datastore.test.db', { verbose: true })
}

async function loadDatastore (ctx, next) {
  const db = process.env.NODE_ENV === 'test' ? initializeTestDB() : initializeDB()
  await new Promise(resolve => {
    db.loadDatabase({}, () => {
      ctx.db = db
      ctx.collections = {
        todos: todos(db)
      }
      resolve()
    })
  })
  await next()
}

module.exports = loadDatastore
