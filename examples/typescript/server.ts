import fastify from 'fastify'
import fastifyEnvalid from '../..'

const app = fastify({ logger: true })

app.register(fastifyEnvalid)

app.get('/', async (req, res) => {
  const env = app.cleanEnv(process.env, {
    API_KEY: app.validators.str(),
    ADMIN_EMAIL: app.validators.email({ default: 'admin@example.com' }),
    EMAIL_CONFIG_JSON: app.validators.json({ desc: 'Additional email parameters' })
  })

  return { API_KEY: env.API_KEY, ADMIN_EMAIL: env.ADMIN_EMAIL, EMAIL_CONFIG_JSON: env.EMAIL_CONFIG_JSON }
})

app.listen(3000)
