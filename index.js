'use strict'

const fp = require('fastify-plugin')
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

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('validators', {
    str,
    bool,
    num,
    email,
    host,
    url,
    json
  })
  fastify.decorate('cleanEnv', cleanEnv)
  fastify.decorate('makeValidator', makeValidator)
}, { fastify: '3.x' })
