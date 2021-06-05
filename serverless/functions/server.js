const fastify = require('fastify')
const getTweets = require('../../src/server/tweets')

const init = () => {
  const app = fastify()
  app.get('/tweets', getTweets)
  return app
}

module.exoprts = init
