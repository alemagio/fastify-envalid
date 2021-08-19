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
