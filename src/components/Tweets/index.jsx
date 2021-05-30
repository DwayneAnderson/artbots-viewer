import React, { useState, useEffect, useCallback } from 'react'
import UILoading from '../UI/Loading'
import UIError from '../UI/Error'
import Video from '../UI/Video'
import TwitterLogo from './../../img/twitter.svg'
import { fetchTweets } from './http'
import './style.scss'

const Tweets = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tweets, setTweets] = useState(null)
  const [tweetIndex, setTweetIndex] = useState(null)

  const loadTweets = useCallback(() => {
    fetchTweets()
      .then(tweets => {
        if (tweets.error) {
          setError(true)
        }
        setTweets(tweets)
        setTweetIndex(0)
        setLoading(false)
      })
  }, [])

  const reset = useCallback(() => {
    setTweets(null)
    setTweetIndex(null)
    setLoading(true)
    loadTweets()
  }, [loadTweets])

  useEffect(loadTweets, [loadTweets])

  useEffect(() => {
    if (tweetIndex === null) return
    if (tweetIndex === tweets.length) return reset()
    setTimeout(() => setTweetIndex(tweetIndex + 1), 60 * 1000)
  }, [tweetIndex, reset, tweets])

  return (
    <div className='Tweets'>
      {error && <UIError className='Tweets__Error' />}
      {loading && <UILoading className='Tweets__Loading' />}
      {(!loading && !error) && tweets.slice(tweetIndex, tweetIndex + 1).map(tweet => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          current={tweet.id === tweets[tweetIndex].id}
        />
      ))}
    </div>
  )
}

const Tweet = ({ tweet, i, current }) => (
  <div className={`Tweet ${current ? 'Tweet--current' : ''}`}>
    <TweetInfo tweet={tweet} />
    {tweet.isVideo && <TweetVideo tweet={tweet} />}
    {tweet.isImage && <TweetImage tweet={tweet} />}
  </div>
)

const TweetInfo = ({ tweet }) => (
  <div className='Tweet__Info'>
    <img
      className='Tweet__Logo'
      src={TwitterLogo}
      alt=''
    />
    <div className='Tweet__Text'>
      <strong>@{tweet.user}</strong>
      <div>{tweet.text}</div>
    </div>
  </div>
)

const TweetVideo = ({ tweet }) => (
  <div className='Tweet__Video'>
    <Video
      src={tweet.mediaUrl}
    />
  </div>
)

const TweetImage = ({ tweet }) => (
  <div
    className='Tweet__Image'
    style={{ backgroundImage: `url(${tweet.mediaUrl})` }}
  />
)

export default Tweets
