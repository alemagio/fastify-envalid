import fastify from 'fastify'
import fastifyEnvalid, { Validators, CleanEnvFunction } from '..'
import { expectType } from 'tsd'
import { Spec, ValidatorSpec } from 'envalid'

let app
try {
  app = fastify()
  await app.ready()
  await app.register(fastifyEnvalid)
  expectType<Validators>(app.validators)
  expectType<CleanEnvFunction>(app.cleanEnv)
  expectType<<T>(
  parser: (input: string) => T,
  type?: string
  ) => (spec?: Spec<T>) => ValidatorSpec<T>>(app.makeValidator)
} catch (err) {
  console.error(err)
}
