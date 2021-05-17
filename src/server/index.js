const fastify = require('fastify')({
  logger: true
})
const fs = require('fs')
const path = require('path')
const resolvePath = require('resolve-path')

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '..', '../build')
})

fastify.get('/api/foo', async (request, reply) => {
  return { foo: 'bar' }
})

fastify.get('/api/*', async (request, reply) => {
  return { hello: 'world', foo: ['bar', 'baz', 'quux'] }
})

fastify.get('/', async (request, reply) => {
  const stream = fs.createReadStream(resolvePath('build/index.html'))
  reply.type('text/html').send(stream)
})

const start = async () => {
  try {
    await fastify.listen(5000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
