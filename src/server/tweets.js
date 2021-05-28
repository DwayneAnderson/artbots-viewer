const TwitterClient = require('twitter-api-client')
const twitter = new TwitterClient.TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_API_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
})

module.exports = async (request, reply) => {
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
        media: tweet.entities.media,
        size: tweet.entities.media[0].sizes.large
      })
    }
  })
  return tweets
}
