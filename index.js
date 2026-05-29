import fp from 'fastify-plugin'
import {
  str,
  bool,
  num,
  email,
  host,
  url,
  json,
  port,
  cleanEnv,
  makeValidator
} from 'envalid'

export default fp(async function (fastify, opts) {
  fastify.decorate('validators', {
    str,
    bool,
    num,
    email,
    host,
    url,
    json,
    port
  })
  fastify.decorate('cleanEnv', cleanEnv)
  fastify.decorate('makeValidator', makeValidator)
}, { fastify: '3.x' })
