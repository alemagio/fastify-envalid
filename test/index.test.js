import { test } from 'tap'
import {
  str,
  bool,
  num,
  email,
  host,
  url,
  json,
  cleanEnv,
  makeValidator
} from 'envalid'
import fastify from 'fastify'
import fastifyEnvalid from '../index.js'

const env = {
  API_KEY: 123,
  NODE_ENV: 'production'
}

test('should register the correct decorators', async t => {
  t.plan(6)

  const app = fastify()

  app.register(fastifyEnvalid)

  await app.ready()

  t.ok(app.hasDecorator('validators'))
  t.same(app.validators, {
    str,
    bool,
    num,
    email,
    host,
    url,
    json
  })
  t.ok(app.hasDecorator('cleanEnv'))
  t.same(app.cleanEnv, cleanEnv)
  t.ok(app.hasDecorator('makeValidator'))
  t.same(app.makeValidator, makeValidator)
})

test('should produce the correct env', async t => {
  t.plan(2)
  const app = fastify()

  app.register(fastifyEnvalid)

  await app.ready()

  const pluginEnv = app.cleanEnv(env, {
    API_KEY: app.validators.num(),
    NODE_ENV: app.validators.str()
  })
  const envalidEnv = cleanEnv(env, {
    API_KEY: app.validators.num(),
    NODE_ENV: app.validators.str()
  })

  t.same(pluginEnv.API_KEY, envalidEnv.API_KEY)
  t.same(pluginEnv.NODE_ENV, envalidEnv.NODE_ENV)
})

test('should support custom validators via makeValidator', async t => {
  t.plan(2)

  const app = fastify()
  app.register(fastifyEnvalid)
  await app.ready()

  const isEven = app.makeValidator((input) => {
    const n = Number(input)
    if (!Number.isInteger(n) || n % 2 !== 0) {
      throw new Error('Must be an even integer')
    }
    return n
  })

  const result = app.cleanEnv({ FOO: '42' }, {
    FOO: isEven()
  })
  t.equal(result.FOO, 42)

  // envalid calls process.exit(1) on invalid env, so intercept it
  const origExit = process.exit
  process.exit = (code) => { throw new Error('process.exit') }
  t.throws(() => app.cleanEnv({ FOO: '43' }, { FOO: isEven() }))
  process.exit = origExit
})
