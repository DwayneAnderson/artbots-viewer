require('dotenv').config()
const path = require('path')
const getTweets = require('./tweets')
const getClient = require('./client')

const fastify = require('fastify')({
  logger: {}
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '..', '../build')
})

fastify.get('/api/tweets', getTweets)

fastify.setNotFoundHandler(getClient)

const start = async () => {
  try {
    await fastify.listen(5000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
