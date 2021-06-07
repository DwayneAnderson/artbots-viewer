import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import UILoading from '../UI/Loading'
import UIError from '../UI/Error'
import Video from '../UI/Video'
import TwitterLogo from './../../img/twitter.svg'
import { fetchTweets } from './http'
import './style.scss'

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const Tweets = () => {
  const { listId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tweets, setTweets] = useState(null)
  const [isAllMode] = useState(listId === 'all')
  const [tweetIndex, setTweetIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setFullscreen(!window.screenTop && !window.screenY)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const loadTweets = useCallback(() => {
    fetchTweets(listId || '976556889981906945')
      .then(tweets => {
        if (tweets.error) {
          setError(tweets.error)
        }
        setTweets(tweets)
        setTweetIndex(isAllMode ? getRandomInt(0, tweets.length) : 0)
        setLoading(false)
      })
  }, [listId, isAllMode])
  useEffect(loadTweets, [loadTweets, listId])

  const reset = useCallback(() => {
    setTweets(null)
    setTweetIndex(null)
    setLoading(true)
    loadTweets()
  }, [loadTweets])

  useEffect(() => {
    if (!tweets) return
    if (tweetIndex === null) return
    if (tweetIndex === tweets.length) return reset()
    setTimeout(() => setTweetIndex(isAllMode ? getRandomInt(0, tweets.length) : tweetIndex + 1), (isAllMode ? 20 : 60) * 1000)
  }, [tweetIndex, reset, tweets, isAllMode])

  useEffect(() => {
    if (isAllMode) {
      setTweetIndex(getRandomInt(0, 3000))
    }
  }, [isAllMode])

  return (
    <div className={`Tweets ${fullscreen ? 'Tweets--fullscreen' : ''} ${isAllMode ? 'Tweets--all' : ''}`}>
      {error && <UIError className='Tweets__Error' message={error} />}
      {loading && <UILoading className='Tweets__Loading' />}
      {(!loading && !error) && tweets.slice(tweetIndex, tweetIndex + 4).map(tweet => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          current={tweet.id === tweets[tweetIndex].id}
          // hideInfo={isAllMode}
        />
      ))}
    </div>
  )
}

const Tweet = ({ tweet, i, current, hideInfo = false }) => (
  <div className={`Tweet ${current ? 'Tweet--current' : ''}`}>
    {!hideInfo && (
      <TweetInfo tweet={tweet} />
    )}
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
