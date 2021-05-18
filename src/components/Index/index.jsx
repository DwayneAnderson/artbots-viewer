import React, { useEffect, useState } from 'react'
import UILoading from './../UI/Loading'
import UIError from './../UI/Error'
import './style.scss'

const Index = () => {
  const [tweets, setTweets] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/tweets')
      .then(tweets => tweets.json())
      .then(tweets => setTweets(tweets))
      .catch(error => {
        console.error(error)
        setError(error)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='Index'>
      {loading && <UILoading className='Index__Loading' />}
      {error && <UIError className='Index__Error' />}
      {tweets && tweets.map(tweet => (
        <div key={tweet.id} className='tweet'>
          <div className='tweet__info'>@{tweet.user}: {tweet.text}</div>
          <img src={tweet.img} className='tweet__img' alt={tweet.text} />
        </div>
      ))}
    </div>
  )
}

export default Index
