import React, { useEffect, useState, useCallback } from 'react'
import UILoading from './../UI/Loading'
import UIError from './../UI/Error'
import './style.scss'

const Index = () => {
  const [tweets, setTweets] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imgIndex, setImgIndex] = useState(null)
  const [lastImgIndex, setLastImgIndex] = useState(null)

  const fetchTweets = useCallback(() => {
    fetch('/api/tweets')
      .then(tweets => tweets.json())
      .then(tweets => {
        setTweets(tweets)
        setLastImgIndex(tweets.length - 1)
      })
      .catch(error => {
        console.error(error)
        setError(error)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
          setImgIndex(0)
        }, 5 * 1000)
      })
  }, [])

  const reset = useCallback(() => {
    setTweets(null)
    setImgIndex(null)
    setLoading(true)
    fetchTweets()
  }, [fetchTweets])

  useEffect(() => {
    fetchTweets()
  }, [fetchTweets])

  useEffect(() => {
    if (imgIndex === null) {
      return
    } else if (imgIndex === lastImgIndex) {
      reset()
      return
    }
    setTimeout(() => {
      setImgIndex(imgIndex + 1)
    }, 60 * 1000)
  }, [imgIndex, reset, lastImgIndex])

  return (
    <div className='Index'>
      {loading && <UILoading className='Index__Loading' />}
      {error && <UIError className='Index__Error' />}
      {tweets && tweets.map((tweet, i) => (
        <div key={tweet.id} className='tweet'>
          <div className='tweet__info'>
            @{tweet.user}: {tweet.text}
          </div>
          <div
            className={`tweet__img ${i === imgIndex ? 'tweet__img--current' : ''}`}
            style={{ backgroundImage: `url(${tweet.img})` }}
          />
        </div>
      ))}
    </div>
  )
}

export default Index
