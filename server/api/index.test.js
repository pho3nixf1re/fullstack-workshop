const test = require('ava')

const mockRequest = require('../lib/test-helpers/mock-request')
const root = require('./')

test('root router returns not implemented error with empty body', async t => {
  await mockRequest(root.routes()).get('/')
    .expect(501)
    .expect({})
})

test('mounts todo routes', async t => {
  await mockRequest(root.routes()).get('/todos')
    .expect(200)
})
