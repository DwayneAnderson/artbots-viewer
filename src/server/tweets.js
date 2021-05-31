const TwitterClient = require('twitter-api-client')
const twitter = new TwitterClient.TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_API_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
})

module.exports = async (request, reply) => {
  const { listId } = request.params
  let twitterError = false
  const tweets = []

  const twitterRequest = await twitter.accountsAndUsers.listsStatuses({
    list_id: listId,
    count: 200
  }).catch(error => {
    twitterError = error
    console.error('Twitter API error: ', error.data)
  })

  if (twitterError) {
    const errorData = JSON.parse(twitterError.data).errors[0]
    const errorMessage = errorData.code.toString() === '112'
      ? 'Twitter API: Invalid Twitter List ID'
      : 'Twitter API Error'
    return reply.code(twitterError.statusCode).send({ error: errorMessage })
  }

  twitterRequest.forEach(tweet => {
    const { id, text, source, user } = tweet
    let mediaUrl = tweet?.entities?.media?.[0]?.media_url
    if (mediaUrl) {
      const isVideo = mediaUrl.match('video_thumb')
      if (isVideo) {
        mediaUrl = mediaUrl
          .replace('http:', 'https:')
          .replace('pbs.twimg.com', 'video.twimg.com')
          .replace('tweet_video_thumb', 'tweet_video')
          .replace('.jpg', '.mp4')
      }

      tweets.push({
        id,
        text,
        source,
        mediaUrl,
        isVideo: !!isVideo,
        isImage: !isVideo,
        user: user.screen_name,
        media: tweet.entities.media,
        size: tweet.entities.media[0].sizes.large
      })
    }
  })
  return tweets
}
