import { FastifyPlugin } from 'fastify'
import { Spec, ValidatorSpec, CleanOptions, CleanedEnvAccessors } from 'envalid'

declare module 'fastify' {
  export interface FastifyInstance {
    validators: Validators
    cleanEnv: CleanEnvFunction
    makeValidator: <T>(
      parser: (input: string) => T,
      type?: string
    ) => (spec?: Spec<T>) => ValidatorSpec<T>
  }
}

export interface Validators {

  bool: <T extends boolean = boolean>(spec?: Spec<T>) => ValidatorSpec<T>

  num: <T extends number = number>(spec?: Spec<T>) => ValidatorSpec<T>

  str: <T extends string = string>(spec?: Spec<T>) => ValidatorSpec<T>

  json: <T = any>(spec?: Spec<T>) => ValidatorSpec<T>

  url: <T extends string = string>(spec?: Spec<T>) => ValidatorSpec<T>

  email: <T extends string = string>(spec?: Spec<T>) => ValidatorSpec<T>

  host: <T extends string = string>(spec?: Spec<T>) => ValidatorSpec<T>

  port: <T extends number = number>(spec?: Spec<T>) => ValidatorSpec<T>

}

export declare type CleanEnvFunction = <T>(environment: unknown, specs: {
  [K in keyof T]: ValidatorSpec<T[K]>;
}, options?: CleanOptions<T>) => Readonly<T & CleanedEnvAccessors>

declare const fastifyEnvalid: FastifyPlugin
export default fastifyEnvalid
