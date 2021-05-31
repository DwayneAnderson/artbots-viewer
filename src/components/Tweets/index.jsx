import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import UILoading from '../UI/Loading'
import UIError from '../UI/Error'
import Video from '../UI/Video'
import TwitterLogo from './../../img/twitter.svg'
import { fetchTweets } from './http'
import './style.scss'

const Tweets = () => {
  const { listId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tweets, setTweets] = useState(null)
  const [tweetIndex, setTweetIndex] = useState(null)
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
          setError(true)
        }
        setTweets(tweets)
        setTweetIndex(0)
        setLoading(false)
      })
  }, [listId])
  useEffect(loadTweets, [loadTweets, listId])

  const reset = useCallback(() => {
    setTweets(null)
    setTweetIndex(null)
    setLoading(true)
    loadTweets()
  }, [loadTweets])
  useEffect(() => {
    if (tweetIndex === null) return
    if (tweetIndex === tweets.length) return reset()
    setTimeout(() => setTweetIndex(tweetIndex + 1), 60 * 1000)
  }, [tweetIndex, reset, tweets])

  return (
    <div className={`Tweets ${fullscreen ? 'Tweets--fullscreen' : ''}`}>
      {error && <UIError className='Tweets__Error' />}
      {loading && <UILoading className='Tweets__Loading' />}
      {(!loading && !error) && tweets.slice(tweetIndex, tweetIndex + 4).map(tweet => (
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