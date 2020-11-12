const { test } = require('tap')
const {
  str,
  bool,
  num,
  email,
  host,
  url,
  json,
  cleanEnv,
  makeValidator
} = require('envalid')

test('should register the correct decorators', async t => {
  t.plan(6)

  const app = require('fastify')()

  app.register(require('..'))

  await app.ready()

  t.true(app.hasDecorator('validators'))
  t.deepEqual(app.validators, {
    str,
    bool,
    num,
    email,
    host,
    url,
    json
  })
  t.true(app.hasDecorator('cleanEnv'))
  t.deepEqual(app.cleanEnv, cleanEnv)
  t.true(app.hasDecorator('makeValidator'))
  t.deepEqual(app.makeValidator, makeValidator)
})

test('should produce the correct env', async t => {
  t.plan(1)
  const app = require('fastify')()

  app.register(require('..'))

  await app.ready()
  t.deepEqual(app.cleanEnv(process.env), cleanEnv(process.env))
})
