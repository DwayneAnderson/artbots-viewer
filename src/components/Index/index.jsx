import React, { useEffect, useState, useCallback } from 'react'
import UILoading from './../UI/Loading'
import UIError from './../UI/Error'
import Video from './Video'
import TwitterLogo from './../../img/twitter.svg'
import './style.scss'

const Index = () => {
  const [tweets, setTweets] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tweetIndex, setTweetIndex] = useState(null)
  const [lastImgIndex, setLastImgIndex] = useState(null)

  const fetchTweets = useCallback(() => {
    fetch('/api/tweets')
      .then(tweets => tweets.json())
      .then(tweets => {
        if (tweets.error) {
          console.error(error)
          setError(true)
        } else {
          setTweets(tweets)
          setLastImgIndex(tweets.length - 1)
          setTimeout(() => {
            setLoading(false)
            setTweetIndex(0)
          }, 5 * 1000)
        }
      })
      .catch(error => {
        console.error(error)
        setError(true)
      })
  }, [error])

  const reset = useCallback(() => {
    setTweets(null)
    setTweetIndex(null)
    setLoading(true)
    fetchTweets()
  }, [fetchTweets])

  useEffect(() => {
    fetchTweets()
  }, [fetchTweets])

  useEffect(() => {
    if (tweetIndex === null) {
      return
    } else if (tweetIndex === lastImgIndex) {
      reset()
      return
    }
    setTimeout(() => {
      setTweetIndex(tweetIndex + 1)
    }, 60 * 1000)
  }, [tweetIndex, reset, lastImgIndex])

  if (error) {
    return <UIError className='Index__Error' />
  }

  if (loading) {
    return <UILoading className='Index__Loading' />
  }

  return (
    <div className='Index'>
      {tweets && tweets.map((tweet, i) => {
        if (i < tweetIndex) {
          return null
        }
        return (
          <div key={tweet.id} className={`Tweet ${i === tweetIndex ? 'Tweet--current' : ''}`}>
            <div className='Tweet__Info'>
              <img src={TwitterLogo} alt='' className='Tweet__Logo' />
              <div className='Tweet__Text'>
                @{tweet.user}: {tweet.text}
              </div>
            </div>
            {tweet.isVideo
              ? (
                <div className='Tweet__Video'>
                  {i < tweetIndex + 5 && (
                    <Video src={tweet.mediaUrl} />
                  )}
                </div>
                )
              : <div
                  className='Tweet__Image'
                  style={{ backgroundImage: `url(${tweet.mediaUrl})` }}
                />}
          </div>
        )
      })}
    </div>
  )
}

export default Index
