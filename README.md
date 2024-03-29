# fastify-envalid

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  ![CI workflow](https://github.com/alemagio/fastify-envalid/workflows/CI%20workflow/badge.svg)

Supports Fastify versions `3.x`

## Install
```
npm i fastify-envalid
```

## Usage
Require `fastify-envalid` and register.
```js
import fastify from 'fastify'
import fastifyEnvalid from 'fastify-envalid'

const app = fastify()

fastify.register(fastifyEnvalid)

fastify.listen(3000)
```

The plugin will create 3 decorators on your `fastify` instance:

* `cleanEnv` - A function which is exactly `envalid` [cleanEnv](https://github.com/af/envalid/blob/master/README.md#envalidcleanenvenvironment-validators-options)
* `validators` - An object that contains all the `envalid` [validators](https://github.com/af/envalid/blob/master/README.md#validator-types)
* `makeValidator` - A function which is exactly `envalid` [makeValidators](https://github.com/af/envalid/blob/master/README.md#custom-validators)

## Acknowledgements

The code is a port for Fastify of [`envalid`](https://github.com/af/envalid).

## License

Licensed under [MIT](./LICENSE).<br/>
