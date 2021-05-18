require('dotenv').config()
const fs = require('fs')
const path = require('path')
const resolvePath = require('resolve-path')
const TwitterClient = require('twitter-api-client')

const twitter = new TwitterClient.TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_API_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
})

const fastify = require('fastify')({
  logger: {
    prettyPrint: true
  }
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '..', '../build')
})

fastify.get('/api/tweets', async (request, reply) => {
  let twitterError = false
  const tweets = []
  const twitterRequest = await twitter.accountsAndUsers.listsStatuses({
    list_id: process.env.TWITTER_LIST_ID,
    count: 200
  }).catch(error => {
    twitterError = error
    console.error('Twitter API error: ', error)
  })
  if (twitterError) {
    return reply.code(500).send({ error: twitterError })
  }
  twitterRequest.forEach(tweet => {
    const { id, text, source, user } = tweet
    const img = tweet?.entities?.media?.[0]?.media_url
    if (img) {
      tweets.push({
        id,
        text,
        source,
        img,
        user: user.screen_name,
        size: tweet.entities.media[0].sizes.large
      })
    }
  })
  return tweets
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
